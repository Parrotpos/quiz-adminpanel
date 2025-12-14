interface ImageDropzoneProps {
  value?: Blob | string | null;
  onChange?: (file: Blob | null) => void;
  label?: string;
  error?: string;
}
