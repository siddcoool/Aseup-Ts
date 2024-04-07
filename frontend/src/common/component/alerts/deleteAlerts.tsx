import {
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
    Button,
    Spinner,
} from "@chakra-ui/react";

const DeleteAlert = ({
    isOpen,
    title,
    onClose,
    onClick,
    ref,
    loading,
}: {
    isOpen: boolean;
    title: string;
    onClose: () => void;
    onClick: () => void;
    ref: any;
    loading: boolean;
}) => {
    return (
        <AlertDialog isOpen={isOpen} leastDestructiveRef={ref} onClose={onClose}>
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Delete "<i>{title}</i>"?
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        Are you sure you want to delete? You can't undo this action
                        afterwards.
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button ref={ref} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            disabled={loading}
                            colorScheme="red"
                            onClick={onClick}
                            ml={3}
                        >
                            {loading ? <Spinner /> : "Delete"}
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
};

export default DeleteAlert;
