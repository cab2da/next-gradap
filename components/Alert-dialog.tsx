import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
  
interface ModalCloseProps {
    isOpen: boolean;
    title: string;
    content: string;
    onClose: () => void;
  }

interface ModalYNProps {
    isOpen: boolean;
    title: string;
    content: string;
    onAction: () => void;
    onClose: () => void;
  }


  export function AlertDialogDemo({ isOpen, title, content, onClose }: ModalCloseProps) {
    return (
      <AlertDialog open={isOpen} onOpenChange={onClose}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>{content}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={onClose}>확인</AlertDialogCancel>
          </AlertDialogFooter>
          </AlertDialogContent>
      </AlertDialog>
    )
  }

  export function AlertDialogYN({ isOpen, title, content, onAction, onClose }: ModalYNProps) {
    return (
      <AlertDialog open={isOpen} onOpenChange={onClose}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription className="text-red-600">{content}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <div className="flex flex-row items-center justify-center space-x-2">
            <AlertDialogAction
                className="w-full bg-red-400 text-center translate-y-1"
                onClick={onAction}
              >
                실행
              </AlertDialogAction>
              <AlertDialogCancel onClick={onClose} className="w-full text-center">
                취소
              </AlertDialogCancel>
            </div>
          </AlertDialogFooter>
          </AlertDialogContent>
      </AlertDialog>
    )
  }
  