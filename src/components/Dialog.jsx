import {
 Button,
 Dialog,
 DialogHeader,
 DialogBody,
 DialogFooter,
} from "@material-tailwind/react";

export function DialogDefault({ open, setOpen, onConfirm, onCancel }) {
 const handleOpen = () => {
    setOpen(!open);
 };

 return (
    <>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader className="bg-gray-400">Change Language Confirmation</DialogHeader>
        <DialogBody className="bg-gray-400">
          Changing the language will result in the loss of any unsaved progress in the current language. Are you sure you want to proceed?
        </DialogBody>
        <DialogFooter className="bg-gray-400">
          <Button
            variant="text"
            color="red"
            onClick={onCancel}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient"  onClick={onConfirm} className="ml-3 text-green-950">
            <span className="text-green">Continue</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
 );
}
