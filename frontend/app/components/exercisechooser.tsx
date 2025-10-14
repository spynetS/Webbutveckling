import React, { useEffect, useMemo, useRef } from "react";

export type ImageOption = { url: string; name: string };

export type ImagePickerModalProps = {
  open: boolean;
  // stäng ner fönster
  onClose: () => void;
  // val av bild
  onSelect: (image: ImageOption) => void;
  //titel val
  title?: string;
  //lista av bilder
  images?: ImageOption[];
  // namn på arailebl bet inte vad det heter på svencka :(
  ariaLabel?: string;
  //classer for modal boxer
  boxClassName?: string;
};

const files = import.meta.glob("../exercisephoto/*.{png,jpg,jpeg}", {
  eager: true,
  as: "url",
});

const DEFAULT_IMAGE_OPTIONS: ImageOption[] = Object.entries(files).map(
  ([path, url]) => {
    const name = path.split("/").pop() ?? "image";
    return { url: url as string, name };
  }
);

const exercisechooser: React.FC<ImagePickerModalProps> = ({
  open,
  onClose,
  onSelect,
  title = "Välj övning Bosse",
  images,
  ariaLabel = "Bildväljare",
  boxClassName = "max-w-3xl",
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      try {
        dialog.showModal();
      } catch {
        dialog.setAttribute("open", "true");
      }
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  const handleClose = () => {
    onClose?.();
  };

  const options: ImageOption[] = useMemo(
    () => (images && images.length > 0 ? images : DEFAULT_IMAGE_OPTIONS),
    [images]
  );

  return (
    <dialog
      ref={dialogRef}
      className="modal"
      aria-label={ariaLabel}
      aria-modal="true"
      onClose={handleClose}
      onCancel={handleClose}
    >
      <div className={`modal-box ${boxClassName}`}>
        <h3 className="font-bold text-lg mb-4">{title}</h3>

        {options.length === 0 ? (
          <p className="opacity-70">
            Lägg in bilder bosse i <code>src/exercisephoto</code>.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {options.map((img) => (
              <button
                key={img.url}
                type="button"
                className="group rounded-xl overflow-hidden border hover:shadow focus:outline-none"
                title={`Use ${img.name}`}
                onClick={() => {
                  onSelect(img);
                  // stänger efter val av bild
                  dialogRef.current?.close();
                }}
              >
                <img
                  src={img.url}
                  alt={img.name}
                  className="w-full h-32 object-cover group-hover:opacity-90"
                />
                <div className="px-2 py-1 text-xs text-center truncate">
                  {img.name}
                </div>
              </button>
            ))}
          </div>
        )}

        <div className="modal-action">
          
          <form method="dialog">
            <button type="submit" className="btn">
              Är du klar nu bosse
            </button>
          </form>
        </div>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button aria-label="Stäng" />
      </form>
    </dialog>
  );
};

export default exercisechooser;
