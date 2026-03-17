const SudokuGameOverModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-600 rounded-xl p-8 flex flex-col items-center gap-4">
        <h2>🎉 Congratulations!</h2>
        <p>Sudoku puzzle solved!</p>
        <button
          className="px-4 py-1 bg-green-300 text-white rounded-lg hover:bg-green-700 transition"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SudokuGameOverModal;
