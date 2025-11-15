import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
  import { Button } from "@/components/ui/button";
  
  interface ConfirmationModalProps {
    open: boolean;
    title: React.ReactNode;
    onConfirm: () => void;
    onCancel: () => void;
  }
  
  export function ConfirmationModal({
    open,
    title,
    onConfirm,
    onCancel,
  }: ConfirmationModalProps) {
    return (
      <Dialog open={open} onOpenChange={onCancel}>
        <DialogContent className="sm:max-w-md rounded-lg p-6">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-center">
              {title}
            </DialogTitle>
          </DialogHeader>
  
          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={onCancel}
              className="w-[45%] hover:border-red-500 hover:text-red-500 transition-colors"
            >
              Não
            </Button>
            <Button
              onClick={onConfirm}
              className="w-[45%] bg-[#3FAFC3] text-white hover:bg-[#2e8a9c] transition-colors"
            >
              Sim
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }