function renderTree() {
  const input = document.getElementById('treeInput').value.trim();
  const treeOutput = document.getElementById('treeOutput');
  
  if (input === '') {
      treeOutput.textContent = 'Пожалуйста, введите определение дерева.';
      return;
  }
  
  try {
      const tree = parseTree(input);
      const treeStr = visualizeTree(tree);
      treeOutput.textContent = treeStr;
  } catch (error) {
      treeOutput.textContent = 'Ошибка: ' + error.message;
  }
}

function parseTree(input) {
  const stack = [];
  let currentNode = null;
  let currentNum = '';
  let rootNode = null;
  console.log("rootNode",rootNode);
  for (let i = 0; i < input.length; i++) {
    const char = input[i];

    if (char === '(') {
        if (!rootNode) {
            rootNode = { value: null, children: [] };
            currentNode = rootNode;
            console.log("currentNode",currentNode)
        } else if (currentNode) {
            const newNode = { value: parseInt(currentNum), children: [] };
            currentNode.children.push(newNode);
            stack.push(currentNode);
            console.log("currentNode",currentNode)
            currentNode = newNode;
            currentNum = '';
        }
    } else if (char === ')') {
        if (currentNum !== '') {
            currentNode.children.push({ value: parseInt(currentNum), children: [] });
            currentNum = '';
        }
        if (stack.length === 0) {
            console.error('Неправильное определение дерева: неверное количество закрывающих скобок');
            return null;
        }
        currentNode = stack.pop();
    } else if (char === ' ') {
        if (currentNum !== '') {
            currentNode.children.push({ value: parseInt(currentNum), children: [] });
            currentNum = '';
        }
    } else {
        currentNum += char;
    }
  }

  if (currentNum !== '') {
      currentNode.children.push({ value: parseInt(currentNum), children: [] });
  }

  if (stack.length !== 0) {
      console.error('Неправильное определение дерева: неверное количество открывающих скобок');
      return null;
  }

  if (!rootNode) {
      console.error('Неправильное определение дерева: отсутствует корень');
      return null;
  }
console.log("rootNode",rootNode);
  return rootNode;
}


function visualizeTree(tree, depth = 0) {
  let treeStr = '';

  if (tree) {
      treeStr += ' '.repeat(depth * 4) + tree.value + '\n';
      tree.children.forEach(child => {
          treeStr += visualizeTree(child, depth + 1);
      });
  }

  return treeStr;
}
