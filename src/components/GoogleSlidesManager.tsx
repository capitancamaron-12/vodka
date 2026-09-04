import React, { useState, useEffect } from 'react';
import { 
  initAuth, 
  googleSignIn, 
  logout, 
  exportToGoogleSlides, 
  listUserGoogleSlides, 
  DriveSlideFile 
} from '../lib/googleSlides';
import { PRESENTATION_SLIDES } from '../data/vodkaData';
import { User } from 'firebase/auth';
import { 
  Presentation, 
  ExternalLink, 
  CheckCircle2, 
  FolderSync, 
  LogOut, 
  Sparkles, 
  AlertCircle, 
  Layers, 
  FileText, 
  Clock, 
  Send,
  Loader2,
  Share2,
  ShieldCheck,
  Award
} from 'lucide-react';

export const GoogleSlidesManager: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [lastExportedUrl, setLastExportedUrl] = useState<string | null>(null);
  const [lastExportedTitle, setLastExportedTitle] = useState<string | null>(null);
  const [driveSlides, setDriveSlides] = useState<DriveSlideFile[]>([]);
  const [isLoadingDrive, setIsLoadingDrive] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [customDeckTitle, setCustomDeckTitle] = useState<string>('Presentación del Vodka - David Taylor, Edwin Martínez & Servillano Real');

  useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser, accessToken) => {
        setUser(currentUser);
        setToken(accessToken);
        fetchUserSlides(accessToken);
      },
      () => {
        setUser(null);
        setToken(null);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    setIsLoggingIn(true);
    setErrorMsg(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setToken(result.accessToken);
        fetchUserSlides(result.accessToken);
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setErrorMsg(err.message || 'Error al iniciar sesión con Google.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleSignOut = async () => {
    await logout();
    setUser(null);
    setToken(null);
    setDriveSlides([]);
    setLastExportedUrl(null);
  };

  const fetchUserSlides = async (accessToken: string) => {
    setIsLoadingDrive(true);
    try {
      const files = await listUserGoogleSlides(accessToken);
      setDriveSlides(files);
    } catch (err: any) {
      console.warn('Drive list non-blocking error:', err);
    } finally {
      setIsLoadingDrive(false);
    }
  };

  const handleTriggerExport = () => {
    if (!token) {
      handleSignIn();
      return;
    }
    // Show confirmation modal before creating presentation
    setShowConfirmModal(true);
  };

  const handleConfirmExport = async () => {
    if (!token) return;
    setShowConfirmModal(false);
    setIsExporting(true);
    setErrorMsg(null);

    try {
      const result = await exportToGoogleSlides(
        customDeckTitle,
        PRESENTATION_SLIDES,
        token
      );
      setLastExportedUrl(result.presentationUrl);
      setLastExportedTitle(customDeckTitle);
      // Refresh list
      fetchUserSlides(token);
    } catch (err: any) {
      console.error('Export error:', err);
      setErrorMsg(err.message || 'Error al exportar las diapositivas a Google Slides.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Top Banner Card: Google Slides Integration */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-stone-900 via-stone-900 to-amber-950/30 border border-amber-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Presentation className="w-64 h-64 text-amber-400" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Integración Oficial con Google Slides & Drive</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif-title font-bold text-stone-100">
              Crea y Exporta Diapositivas en Google Slides
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              Exporta las 7 diapositivas académicas elaboradas por David Taylor, Edwin Martínez y Servillano Real (con notas del orador, estadísticas e hitos históricos) directamente a tu cuenta de Google Drive con un solo clic.
            </p>
          </div>

          {/* Auth State & Action Button */}
          <div className="shrink-0 flex flex-col items-start sm:items-end gap-3">
            {!user ? (
              <div className="space-y-2">
                <button
                  id="google-signin-btn"
                  onClick={handleSignIn}
                  disabled={isLoggingIn}
                  className="gsi-material-button inline-flex items-center justify-center gap-3 px-5 py-3 rounded-2xl bg-white hover:bg-stone-100 text-stone-900 font-semibold text-xs sm:text-sm shadow-xl transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  <div className="w-5 h-5 flex items-center justify-center">
                    <svg viewBox="0 0 48 48" className="w-5 h-5">
                      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                    </svg>
                  </div>
                  <span>{isLoggingIn ? 'Conectando con Google...' : 'Conectar con Google'}</span>
                </button>
                <p className="text-[11px] text-stone-400 text-left sm:text-right">
                  Concede acceso para crear y guardar presentaciones en Google Slides.
                </p>
              </div>
            ) : (
              <div className="flex items-center gap-3 bg-stone-950/80 p-2.5 rounded-2xl border border-stone-800">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center justify-center font-bold text-xs">
                  {user.displayName?.charAt(0) || 'G'}
                </div>
                <div className="text-left pr-2">
                  <p className="text-xs font-bold text-stone-100 line-clamp-1">{user.displayName || 'Usuario Google'}</p>
                  <p className="text-[10px] text-emerald-400 font-mono-code flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Google Conectado
                  </p>
                </div>
                <button
                  id="google-logout-btn"
                  onClick={handleSignOut}
                  className="p-2 rounded-xl text-stone-400 hover:text-rose-300 hover:bg-rose-950/40 transition-all text-xs"
                  title="Cerrar sesión"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {errorMsg && (
          <div className="mt-4 p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}
      </div>

      {/* Export & Custom Deck Creator Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Card: 1-Click Google Slides Deck Generator */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-stone-900/80 border border-stone-800 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-stone-800 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Presentation className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-serif-title font-bold text-stone-100">
                  Exportar Presentación Completa a Google Slides
                </h3>
                <p className="text-xs text-stone-400">
                  Genera 7 diapositivas con tipografía formateada, listas y notas de clase
                </p>
              </div>
            </div>
            <span className="text-xs font-mono-code bg-amber-500/20 text-amber-300 px-2.5 py-1 rounded-full border border-amber-500/30 font-bold">
              7 Diapositivas
            </span>
          </div>

          {/* Title Input */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-stone-300 block">
              Título de la Presentación en Google Drive:
            </label>
            <input 
              type="text"
              id="slides-deck-title-input"
              value={customDeckTitle}
              onChange={(e) => setCustomDeckTitle(e.target.value)}
              className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-stone-100 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Slides Preview Summary */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block">
              Estructura que se creará en Google Slides:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {PRESENTATION_SLIDES.map((s, idx) => (
                <div key={s.id} className="p-2.5 rounded-xl bg-stone-950/60 border border-stone-800/80 flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 font-bold text-[10px] flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <div>
                    <span className="font-semibold text-stone-200 block line-clamp-1">{s.title}</span>
                    <span className="text-[10px] text-stone-500">{s.section}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Action Button */}
          <div className="pt-4 border-t border-stone-800 space-y-3">
            <button
              id="export-to-slides-btn"
              onClick={handleTriggerExport}
              disabled={isExporting}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-stone-950 font-bold text-sm shadow-xl shadow-amber-950/50 transition-all active:scale-98 cursor-pointer"
            >
              {isExporting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-stone-950" />
                  <span>Creando Diapositivas en Google Slides...</span>
                </>
              ) : (
                <>
                  <Presentation className="w-4 h-4 text-stone-950" />
                  <span>Exportar a Google Slides (Crear en Mi Drive)</span>
                </>
              )}
            </button>

            {lastExportedUrl && (
              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 space-y-2 animate-fadeIn">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>¡Presentación creada con éxito en Google Slides!</span>
                </div>
                <p className="text-xs text-stone-300">
                  Archivo creado: <strong className="text-stone-100">{lastExportedTitle}</strong>
                </p>
                <div className="pt-2 flex gap-2">
                  <a
                    href={lastExportedUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs shadow-md transition-all"
                  >
                    <span>Abrir en Google Slides</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Card: Google Drive Presentations Browser */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-stone-900/80 border border-stone-800 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-stone-800 pb-3">
            <div className="flex items-center gap-2">
              <FolderSync className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-serif-title font-bold text-stone-100">
                Tus Presentaciones en Google Drive
              </h3>
            </div>
            {token && (
              <button
                onClick={() => fetchUserSlides(token)}
                disabled={isLoadingDrive}
                className="text-[11px] text-amber-400 hover:underline flex items-center gap-1"
              >
                {isLoadingDrive ? <Loader2 className="w-3 h-3 animate-spin" /> : 'Actualizar'}
              </button>
            )}
          </div>

          {!user ? (
            <div className="p-8 text-center space-y-3 text-stone-400">
              <Presentation className="w-12 h-12 mx-auto text-stone-600" />
              <p className="text-xs">
                Inicia sesión con Google para ver y abrir tus presentaciones de Google Slides desde la app.
              </p>
            </div>
          ) : isLoadingDrive ? (
            <div className="p-8 text-center space-y-2 text-stone-400">
              <Loader2 className="w-6 h-6 mx-auto animate-spin text-amber-400" />
              <p className="text-xs">Buscando presentaciones en tu Drive...</p>
            </div>
          ) : driveSlides.length === 0 ? (
            <div className="p-6 text-center space-y-2 text-stone-400">
              <p className="text-xs">
                Aún no tienes presentaciones recientes o haz clic en "Exportar a Google Slides" para crear la primera.
              </p>
            </div>
          ) : (
            <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1 scrollbar-thin">
              {driveSlides.map((slideFile) => (
                <div
                  key={slideFile.id}
                  className="p-3 rounded-2xl bg-stone-950/80 border border-stone-800 hover:border-amber-500/40 transition-all flex items-center justify-between gap-3 group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                      <Presentation className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-stone-200 truncate group-hover:text-amber-300 transition-colors">
                        {slideFile.name}
                      </p>
                      <span className="text-[10px] text-stone-500 flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5" />
                        {new Date(slideFile.modifiedTime).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <a
                    href={slideFile.webViewLink || `https://docs.google.com/presentation/d/${slideFile.id}/edit`}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="px-2.5 py-1.5 rounded-lg bg-stone-900 hover:bg-amber-500 hover:text-stone-950 text-stone-300 text-xs font-medium border border-stone-800 transition-all flex items-center gap-1 shrink-0"
                  >
                    <span>Abrir</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Confirmation Modal for Google Drive Mutation */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-md bg-stone-900 border border-amber-500/40 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-serif-title font-bold text-stone-100">
                Confirmar Creación en Google Drive
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                Se creará una nueva presentación de Google Slides titulada <strong className="text-amber-400">"{customDeckTitle}"</strong> en tu cuenta de Google Drive con 7 diapositivas académicas y notas del orador.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-800">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 rounded-xl bg-stone-950 hover:bg-stone-800 text-stone-400 text-xs font-medium border border-stone-800 transition-all"
              >
                Cancelar
              </button>
              <button
                id="confirm-export-slides-modal-btn"
                onClick={handleConfirmExport}
                className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-lg transition-all"
              >
                Confirmar y Crear en Slides
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
