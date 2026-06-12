import { useState, useCallback } from 'react';

const useDel = (onConfirm) => {
  const [deleteOpen, setdeleteOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [itemName, setItemName] = useState('');

  const openDelete = useCallback((item, name = 'this item') => {
    setItemToDelete(item);
    setItemName(name);
    setdeleteOpen(true);
  }, []);

  const closeDelete = useCallback(() => {
    setdeleteOpen(false);
    setItemToDelete(null);
    setItemName('');
  }, []);

  const confirmDelete = useCallback(() => {
    if (itemToDelete && onConfirm) {
      onConfirm(itemToDelete);
    }
    closeDelete();
  }, [itemToDelete, onConfirm, closeDelete]);

  return {
    deleteOpen,
    itemName,
    openDelete, closeDelete ,
    confirmDelete
  };
};

export default useDel; 


  // const {
  //   deleteOpen,
  //   itemName,
  //   openDelete,
  //   closeDelete,
  //   confirmDelete
  // } = useDeleteConfirmation((itemToDelete) => {
  //   setItems(prevItems => prevItems.filter(item => item.id !== itemToDelete.id));
  //   console.log(`Deleted: ${itemToDelete.name}`);
  // });

  // <Delete
  //   deleteOpen={deleteOpen}
  //   itemName={itemName}
  //   onClose={closeDelete}
  //   onConfirm={confirmDelete}
  // />

  // <button onClick={() => openDelete(item, item.name)}>
  //   Delete
  // </button>