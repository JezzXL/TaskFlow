import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, CheckSquare, Sparkles, Zap, ArrowRight } from 'lucide-react';
import { useStore } from '../store/useStore';
import { generateId } from '../utils/helpers';

export const Login = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [focusedInput, setFocusedInput] = useState<'name' | 'email' | null>(null);
  const setUser = useStore((state) => state.setUser);
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim()) {
      setUser({
        id: generateId(),
        name: name.trim(),
        email: email.trim(),
      });
      navigate('/dashboard');
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      position: 'relative' as const,
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #312e81 0%, #581c87 50%, #9f1239 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
    },
    blob: {
      position: 'absolute' as const,
      borderRadius: '50%',
      filter: 'blur(80px)',
      mixBlendMode: 'multiply' as const,
      animation: 'blobFloat 7s infinite ease-in-out',
    },
    contentWrapper: {
      position: 'relative' as const,
      zIndex: 10,
      width: '100%',
      maxWidth: '28rem',
    },
    logoContainer: {
      textAlign: 'center' as const,
      marginBottom: '2.5rem',
    },
    logoIconWrapper: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative' as const,
      marginBottom: '1.5rem',
    },
    logoGlow: {
      position: 'absolute' as const,
      inset: 0,
      background: 'linear-gradient(to right, #a855f7, #ec4899)',
      borderRadius: '1rem',
      filter: 'blur(30px)',
      animation: 'pulseGlow 2s infinite',
    },
    logoIcon: {
      position: 'relative' as const,
      background: 'white',
      padding: '1rem',
      borderRadius: '1rem',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    },
    title: {
      fontSize: '3rem',
      fontWeight: 900,
      color: 'white',
      marginBottom: '0.75rem',
      letterSpacing: '-0.025em',
    },
    subtitle: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      color: '#ddd6fe',
      fontSize: '1.125rem',
      fontWeight: 600,
      marginBottom: '0.5rem',
    },
    badge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.5rem 1rem',
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      borderRadius: '9999px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      fontSize: '0.875rem',
      fontWeight: 500,
      color: 'white',
    },
    cardWrapper: {
      position: 'relative' as const,
      marginBottom: '2rem',
    },
    cardGlow: {
      position: 'absolute' as const,
      inset: '-2px',
      background: 'linear-gradient(to right, #a855f7, #ec4899, #a855f7)',
      backgroundSize: '200% 200%',
      borderRadius: '1.5rem',
      filter: 'blur(15px)',
      opacity: 0.75,
      animation: 'gradientMove 3s ease infinite',
      transition: 'opacity 0.7s',
    },
    card: {
      position: 'relative' as const,
      background: 'white',
      borderRadius: '1.5rem',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      padding: '2rem',
    },
    formGroup: {
      marginBottom: '1.25rem',
    },
    label: {
      display: 'block',
      fontSize: '0.875rem',
      fontWeight: 700,
      color: '#1f2937',
      marginBottom: '0.5rem',
      marginLeft: '0.25rem',
    },
    inputWrapper: {
      position: 'relative' as const,
    },
    input: {
      width: '100%',
      padding: '1rem 1.25rem',
      borderRadius: '0.75rem',
      fontSize: '1rem',
      fontWeight: 500,
      outline: 'none',
      transition: 'all 0.3s ease',
    },
    inputBase: {
      border: '2px solid #e5e7eb',
      background: '#f9fafb',
      color: '#111827',
    },
    inputFocused: {
      border: '2px solid #a855f7',
      background: 'white',
      boxShadow: '0 10px 15px -3px rgba(168, 85, 247, 0.1)',
      transform: 'scale(1.01)',
    },
    inputDots: {
      position: 'absolute' as const,
      right: '1rem',
      top: '50%',
      transform: 'translateY(-50%)',
      display: 'flex',
      gap: '0.25rem',
    },
    dot: {
      width: '6px',
      height: '6px',
      background: '#a855f7',
      borderRadius: '50%',
      animation: 'bounce 1s infinite',
    },
    submitBtn: {
      position: 'relative' as const,
      width: '100%',
      padding: '1rem 1.5rem',
      borderRadius: '0.75rem',
      fontSize: '1.125rem',
      fontWeight: 700,
      color: 'white',
      border: 'none',
      cursor: 'pointer',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      marginTop: '1.5rem',
      background: 'linear-gradient(to right, #9333ea, #ec4899, #9333ea)',
      backgroundSize: '200% 200%',
      animation: 'gradientMove 3s ease infinite',
    },
    submitBtnDisabled: {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
    btnContent: {
      position: 'relative' as const,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.75rem',
    },
    footer: {
      textAlign: 'center' as const,
      paddingTop: '1.5rem',
      borderTop: '1px solid #f3f4f6',
      marginTop: '1.5rem',
    },
    footerStatus: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      fontSize: '0.75rem',
      color: '#6b7280',
      marginBottom: '0.5rem',
      fontWeight: 500,
    },
    statusDot: {
      width: '8px',
      height: '8px',
      background: '#10b981',
      borderRadius: '50%',
      animation: 'pulseGlow 2s infinite',
    },
    footerText: {
      fontSize: '0.75rem',
      color: '#9ca3af',
    },
    bottomText: {
      textAlign: 'center' as const,
      marginTop: '2rem',
    },
    bottomTextMain: {
      color: 'rgba(255, 255, 255, 0.9)',
      fontSize: '1rem',
      fontWeight: 500,
      marginBottom: '0.5rem',
    },
    bottomTextSub: {
      color: 'rgba(255, 255, 255, 0.6)',
      fontSize: '0.875rem',
    },
  };

  return (
    <>
      <style>{`
        @keyframes blobFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -50px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }
        
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes pulseGlow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>

      <div style={styles.container}>
        {/* Blobs */}
        <div style={{...styles.blob, top: '-160px', left: '-160px', width: '320px', height: '320px', background: '#a855f7', opacity: 0.7}}></div>
        <div style={{...styles.blob, top: '-160px', right: '-160px', width: '320px', height: '320px', background: '#ec4899', opacity: 0.7, animationDelay: '2s'}}></div>
        <div style={{...styles.blob, bottom: '-160px', left: '160px', width: '320px', height: '320px', background: '#6366f1', opacity: 0.7, animationDelay: '4s'}}></div>

        <div style={styles.contentWrapper}>
          {/* Logo */}
          <div style={styles.logoContainer}>
            <div style={styles.logoIconWrapper}>
              <div style={styles.logoGlow}></div>
              <div style={styles.logoIcon}>
                <CheckSquare size={48} color="#9333ea" strokeWidth={2.5} />
              </div>
            </div>
            
            <h1 style={styles.title}>TaskFlow</h1>
            <div style={styles.subtitle}>
              <Sparkles size={18} />
              <p>Produtividade em outro nível</p>
              <Sparkles size={18} />
            </div>
            <div style={styles.badge}>
              <Zap size={14} color="#fbbf24" />
              <span>Acesso Rápido</span>
            </div>
          </div>

          {/* Card */}
          <div style={styles.cardWrapper}>
            <div style={styles.cardGlow}></div>
            
            <div style={styles.card}>
              <form onSubmit={handleSubmit}>
                {/* Name */}
                <div style={styles.formGroup}>
                  <label htmlFor="name" style={styles.label}>Nome Completo</label>
                  <div style={styles.inputWrapper}>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onFocus={() => setFocusedInput('name')}
                      onBlur={() => setFocusedInput(null)}
                      placeholder="Digite seu nome"
                      required
                      style={{
                        ...styles.input,
                        ...(focusedInput === 'name' ? styles.inputFocused : styles.inputBase)
                      }}
                    />
                    {focusedInput === 'name' && (
                      <div style={styles.inputDots}>
                        <div style={styles.dot}></div>
                        <div style={{...styles.dot, animationDelay: '0.1s'}}></div>
                        <div style={{...styles.dot, animationDelay: '0.2s'}}></div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div style={styles.formGroup}>
                  <label htmlFor="email" style={styles.label}>Email</label>
                  <div style={styles.inputWrapper}>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setFocusedInput('email')}
                      onBlur={() => setFocusedInput(null)}
                      placeholder="seu@email.com"
                      required
                      style={{
                        ...styles.input,
                        ...(focusedInput === 'email' ? styles.inputFocused : styles.inputBase)
                      }}
                    />
                    {focusedInput === 'email' && (
                      <div style={styles.inputDots}>
                        <div style={styles.dot}></div>
                        <div style={{...styles.dot, animationDelay: '0.1s'}}></div>
                        <div style={{...styles.dot, animationDelay: '0.2s'}}></div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Button */}
                <button
                  type="submit"
                  disabled={!name.trim() || !email.trim()}
                  style={{
                    ...styles.submitBtn,
                    ...(!name.trim() || !email.trim() ? styles.submitBtnDisabled : {})
                  }}
                  onMouseEnter={(e) => {
                    if (name.trim() && email.trim()) {
                      e.currentTarget.style.transform = 'scale(1.02)';
                      e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(147, 51, 234, 0.5)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={styles.btnContent}>
                    <LogIn size={22} strokeWidth={2.5} />
                    <span>Entrar no TaskFlow</span>
                    <ArrowRight size={22} strokeWidth={2.5} />
                  </div>
                </button>
              </form>

              {/* Footer */}
              <div style={styles.footer}>
                <div style={styles.footerStatus}>
                  <span style={styles.statusDot}></span>
                  <span>Interface de demonstração</span>
                </div>
                <p style={styles.footerText}>
                  Autenticação simplificada para acesso rápido
                </p>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div style={styles.bottomText}>
            <p style={styles.bottomTextMain}>
              Organize suas tarefas com inteligência e estilo ✨
            </p>
            <p style={styles.bottomTextSub}>
              Gerencie projetos, listas e tarefas em um só lugar
            </p>
          </div>
        </div>
      </div>
    </>
  );
};