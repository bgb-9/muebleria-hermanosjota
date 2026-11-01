import { useEffect } from 'react'

/**
 * Diálogo de confirmación reutilizable (por ejemplo, antes de eliminar).
 * Se cierra con Escape o haciendo clic fuera de la tarjeta.
 */
function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'Eliminar',
  cancelLabel = 'Cancelar',
  busy = false,
  onConfirm,
  onCancel
}) {
  useEffect(() => {
    if (!open) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && !busy) onCancel()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, busy, onCancel])

  if (!open) return null

  return (
    <div
      className="confirm-overlay"
      role="presentation"
      onClick={() => {
        if (!busy) onCancel()
      }}
    >
      <div
        className="confirm-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-message"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 className="confirm-dialog__title" id="confirm-dialog-title">{title}</h2>
        <p className="confirm-dialog__message" id="confirm-dialog-message">{message}</p>
        <div className="confirm-dialog__actions">
          <button type="button" className="btn btn--secondary" onClick={onCancel} disabled={busy}>
            {cancelLabel}
          </button>
          <button type="button" className="btn btn--danger" onClick={onConfirm} disabled={busy} autoFocus>
            {busy ? 'Eliminando...' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDialog
