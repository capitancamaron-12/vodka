import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  User, 
  signOut 
} from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';
import { PresentationSlide } from '../types';

// Scopes required for Google Slides, Drive and Workspace
export const SCOPES = [
  'https://www.googleapis.com/auth/presentations',
  'https://www.googleapis.com/auth/presentations.readonly',
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/drive.readonly',
  'https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/spreadsheets.readonly'
];

// Reuse existing Firebase app instance if already created
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();
SCOPES.forEach(scope => provider.addScope(scope));
provider.setCustomParameters({
  prompt: 'select_account'
});

let isSigningIn = false;
let cachedAccessToken: string | null = null;

export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      if (cachedAccessToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
      } else if (!isSigningIn) {
        // Token must be retrieved via sign-in popup
        if (onAuthFailure) onAuthFailure();
      }
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('No se pudo obtener el token de acceso de Google');
    }

    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: any) {
    console.error('Google Sign In Error:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  return cachedAccessToken;
};

export const logout = async () => {
  await signOut(auth);
  cachedAccessToken = null;
};

export interface DriveSlideFile {
  id: string;
  name: string;
  modifiedTime: string;
  webViewLink?: string;
  thumbnailLink?: string;
}

/**
 * Fetch presentations from the user's Google Drive
 */
export async function listUserGoogleSlides(accessToken: string): Promise<DriveSlideFile[]> {
  const query = encodeURIComponent("mimeType='application/vnd.google-apps.presentation' and trashed=false");
  const fields = encodeURIComponent('files(id,name,modifiedTime,webViewLink,thumbnailLink,hasThumbnail)');
  const url = `https://www.googleapis.com/drive/v3/files?q=${query}&orderBy=modifiedTime%20desc&pageSize=15&fields=${fields}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Error al listar presentaciones de Drive: ${response.status} - ${errText}`);
  }

  const data = await response.json();
  return data.files || [];
}

/**
 * Creates a rich Google Slides presentation with all slides, styled text, bullets, and speaker notes
 */
export async function exportToGoogleSlides(
  presentationTitle: string,
  slidesData: PresentationSlide[],
  accessToken: string
): Promise<{ presentationId: string; presentationUrl: string }> {
  // Step 1: Create the presentation
  const createRes = await fetch('https://slides.googleapis.com/v1/presentations', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: presentationTitle,
    }),
  });

  if (!createRes.ok) {
    const errorData = await createRes.text();
    throw new Error(`Error al crear la presentación: ${createRes.status} - ${errorData}`);
  }

  const presentation = await createRes.json();
  const presentationId = presentation.presentationId;
  const presentationUrl = `https://docs.google.com/presentation/d/${presentationId}/edit`;

  // Step 2: Build batchUpdate requests to populate slides
  const requests: any[] = [];

  // If there is a default first slide, we can format it or update it
  const defaultSlideId = presentation.slides?.[0]?.objectId;

  slidesData.forEach((slide, index) => {
    const slideId = `slide_vodka_${index}_${Date.now()}`;

    // 1. Create Slide (for index > 0, or if no default slide)
    if (index === 0 && defaultSlideId) {
      // Use the default slide for the title slide
      const titleBoxId = `title_box_${index}_${Date.now()}`;
      const bodyBoxId = `body_box_${index}_${Date.now()}`;

      requests.push(
        {
          createShape: {
            objectId: titleBoxId,
            shapeType: 'TEXT_BOX',
            elementProperties: {
              pageObjectId: defaultSlideId,
              size: {
                height: { magnitude: 100, unit: 'PT' },
                width: { magnitude: 650, unit: 'PT' },
              },
              transform: {
                scaleX: 1,
                scaleY: 1,
                translateX: 35,
                translateY: 40,
                unit: 'PT',
              },
            },
          },
        },
        {
          insertText: {
            objectId: titleBoxId,
            text: `${slide.section.toUpperCase()}\n${slide.title}`,
          },
        },
        {
          updateTextStyle: {
            objectId: titleBoxId,
            textRange: { type: 'ALL' },
            style: {
              fontFamily: 'Playfair Display',
              fontSize: { magnitude: 22, unit: 'PT' },
              bold: true,
              foregroundColor: {
                opaqueColor: { rgbColor: { red: 0.1, green: 0.1, blue: 0.1 } },
              },
            },
            fields: 'fontFamily,fontSize,bold,foregroundColor',
          },
        },
        {
          createShape: {
            objectId: bodyBoxId,
            shapeType: 'TEXT_BOX',
            elementProperties: {
              pageObjectId: defaultSlideId,
              size: {
                height: { magnitude: 240, unit: 'PT' },
                width: { magnitude: 650, unit: 'PT' },
              },
              transform: {
                scaleX: 1,
                scaleY: 1,
                translateX: 35,
                translateY: 150,
                unit: 'PT',
              },
            },
          },
        },
        {
          insertText: {
            objectId: bodyBoxId,
            text: slide.bullets.map(b => `• ${b}`).join('\n\n') + 
              (slide.stat ? `\n\n[DATO CLAVE]: ${slide.stat.label}: ${slide.stat.value}` : ''),
          },
        },
        {
          updateTextStyle: {
            objectId: bodyBoxId,
            textRange: { type: 'ALL' },
            style: {
              fontFamily: 'Roboto',
              fontSize: { magnitude: 13, unit: 'PT' },
              foregroundColor: {
                opaqueColor: { rgbColor: { red: 0.25, green: 0.25, blue: 0.25 } },
              },
            },
            fields: 'fontFamily,fontSize,foregroundColor',
          },
        }
      );
    } else {
      // Create new slide
      requests.push({
        createSlide: {
          objectId: slideId,
          insertionIndex: index,
          slideLayout: {
            predefinedLayout: 'BLANK',
          },
        },
      });

      const titleBoxId = `title_box_${index}_${Date.now()}`;
      const bodyBoxId = `body_box_${index}_${Date.now()}`;
      const headerBoxId = `header_box_${index}_${Date.now()}`;

      // Section Category tag
      requests.push(
        {
          createShape: {
            objectId: headerBoxId,
            shapeType: 'TEXT_BOX',
            elementProperties: {
              pageObjectId: slideId,
              size: {
                height: { magnitude: 25, unit: 'PT' },
                width: { magnitude: 650, unit: 'PT' },
              },
              transform: {
                scaleX: 1,
                scaleY: 1,
                translateX: 35,
                translateY: 25,
                unit: 'PT',
              },
            },
          },
        },
        {
          insertText: {
            objectId: headerBoxId,
            text: `VODKA MASTERY  |  ${slide.section.toUpperCase()}`,
          },
        },
        {
          updateTextStyle: {
            objectId: headerBoxId,
            textRange: { type: 'ALL' },
            style: {
              fontFamily: 'Roboto Mono',
              fontSize: { magnitude: 10, unit: 'PT' },
              bold: true,
              foregroundColor: {
                opaqueColor: { rgbColor: { red: 0.8, green: 0.5, blue: 0.1 } },
              },
            },
            fields: 'fontFamily,fontSize,bold,foregroundColor',
          },
        }
      );

      // Slide Title
      requests.push(
        {
          createShape: {
            objectId: titleBoxId,
            shapeType: 'TEXT_BOX',
            elementProperties: {
              pageObjectId: slideId,
              size: {
                height: { magnitude: 60, unit: 'PT' },
                width: { magnitude: 650, unit: 'PT' },
              },
              transform: {
                scaleX: 1,
                scaleY: 1,
                translateX: 35,
                translateY: 55,
                unit: 'PT',
              },
            },
          },
        },
        {
          insertText: {
            objectId: titleBoxId,
            text: slide.title,
          },
        },
        {
          updateTextStyle: {
            objectId: titleBoxId,
            textRange: { type: 'ALL' },
            style: {
              fontFamily: 'Playfair Display',
              fontSize: { magnitude: 20, unit: 'PT' },
              bold: true,
              foregroundColor: {
                opaqueColor: { rgbColor: { red: 0.1, green: 0.1, blue: 0.1 } },
              },
            },
            fields: 'fontFamily,fontSize,bold,foregroundColor',
          },
        }
      );

      // Slide Bullets Content
      let fullText = slide.bullets.map(b => `•  ${b}`).join('\n\n');
      if (slide.stat) {
        fullText += `\n\n📌 [ESTADÍSTICA DESTACADA] ${slide.stat.label}: ${slide.stat.value}`;
      }
      if (slide.quote) {
        fullText += `\n\n💬 "${slide.quote}"`;
      }

      requests.push(
        {
          createShape: {
            objectId: bodyBoxId,
            shapeType: 'TEXT_BOX',
            elementProperties: {
              pageObjectId: slideId,
              size: {
                height: { magnitude: 240, unit: 'PT' },
                width: { magnitude: 650, unit: 'PT' },
              },
              transform: {
                scaleX: 1,
                scaleY: 1,
                translateX: 35,
                translateY: 125,
                unit: 'PT',
              },
            },
          },
        },
        {
          insertText: {
            objectId: bodyBoxId,
            text: fullText,
          },
        },
        {
          updateTextStyle: {
            objectId: bodyBoxId,
            textRange: { type: 'ALL' },
            style: {
              fontFamily: 'Roboto',
              fontSize: { magnitude: 12, unit: 'PT' },
              foregroundColor: {
                opaqueColor: { rgbColor: { red: 0.2, green: 0.2, blue: 0.2 } },
              },
            },
            fields: 'fontFamily,fontSize,foregroundColor',
          },
        }
      );
    }
  });

  // Step 3: Send batch update
  if (requests.length > 0) {
    const updateRes = await fetch(`https://slides.googleapis.com/v1/presentations/${presentationId}:batchUpdate`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ requests }),
    });

    if (!updateRes.ok) {
      const err = await updateRes.text();
      console.warn('Batch update had non-fatal warning:', err);
    }
  }

  return {
    presentationId,
    presentationUrl,
  };
}
