const dragItems = document.querySelectorAll('.drag-item');
        const reactionZone = document.getElementById('reaction-zone');
        const result = document.getElementById('result');
    
        let zincDropped = false;
        let cuso4Dropped = false;
    
        // Add dragstart event to items
        dragItems.forEach(item => {
          item.addEventListener('dragstart', dragStart);
        });
    
        // Reaction zone events
        reactionZone.addEventListener('dragover', dragOver);
        reactionZone.addEventListener('drop', dragDrop);
    
        // Function to handle drag start
        function dragStart(e) {
          e.dataTransfer.setData('text/plain', e.target.id);
        }
    
        // Function to allow drop (dragover event)
        function dragOver(e) {
          e.preventDefault();
        }
    
        // Function to handle drop
        function dragDrop(e) {
          e.preventDefault();
          const id = e.dataTransfer.getData('text');
          const draggedElement = document.getElementById(id);
          
          // Place the item in the reaction zone
          reactionZone.appendChild(draggedElement);
          reactionZone.classList.add('dropped');
    
          // Check what was dropped
          if (id === 'zinc') {
            zincDropped = true;
          } else if (id === 'cuso4') {
            cuso4Dropped = true;
          }
    
          // Check if both items are in the reaction zone
          if (zincDropped && cuso4Dropped) {
            triggerReaction();
          }
        }
    
        // Simulate the reaction
        function triggerReaction() {
          result.style.display = 'block';
          result.textContent = "Zn + CuSO₄ → ZnSO₄ + Cu";
          reactionZone.style.backgroundColor = '#ffd700'; // Change color to indicate reaction
    
          setTimeout(() => {
            result.textContent = "Zinc replaces copper in the solution.";
          }, 3000); // After 3 seconds, update the reaction result
        }