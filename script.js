//  Функция renderTree() отображает определение дерева, введенное пользователем, на веб-странице.
//  Она получает ввод пользователя, парсит его, а затем отображает результат в элементе документа.
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

//   Функция parseTree(input) парсит строковое представление дерева и преобразует его в объект дерева.
function parseTree(input) {
  const stack = [];
  let currentNode = null;
  let currentNum = '';
  let rootNode = null;
  
  let openBrackets = 0;
  let closeBrackets = 0;

  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    console.log('Текущий символ:', char);
    console.log('Текущий узел перед обновлением:', currentNode);

    if (char === '(') {
      openBrackets++;
      if (!rootNode) {
        rootNode = { value: null, children: [] };
        currentNode = rootNode;
      } else if (currentNode) {
        const newNode = { value: parseInt(currentNum), children: [] };
        currentNode.children.push(newNode);
        stack.push(currentNode);
        currentNode = newNode;
        currentNum = '';
      }
    }
    else if (char === ')') {
      closeBrackets++;
      if (currentNum !== '') {
        currentNode.children.push({ value: parseInt(currentNum), children: [] });
        currentNum = '';
      }
  
      if (stack.length === 0 && char !== ")") {
        console.error('Неправильное определение дерева: неверное количество закрывающих скобок');
        console.log('Открывающих скобок:', openBrackets, 'Закрывающих скобок:', closeBrackets);
        return null;
      }
      currentNode = stack.pop(); 
      if (stack.length > 0) {
        currentNode = stack[stack.length - 1]; 
      }
    } else if (char === ' ') {
      if (currentNum !== '') {
        if (currentNode === null) {
          console.error('Ошибка: пробел в неправильном месте.');
          return null;
        }
        currentNode.children.push({ value: parseInt(currentNum), children: [] });
        currentNum = '';
      }
    } else {
      currentNum += char;
    }
  }

  if (stack.length > 0) {
    console.error('Неправильное определение дерева: неверное количество открывающих скобок');
    console.log('Открывающих скобок:', openBrackets, 'Закрывающих скобок:', closeBrackets);
    return null;
  }

  if (currentNum !== '') {
    currentNode.children.push({ value: parseInt(currentNum), children: [] });
    currentNum = '';
  }

  if (!rootNode) {
    console.error('Неправильное определение дерева: отсутствует корень');
    return null;
  }

  console.log('Открывающих скобок:', openBrackets, 'Закрывающих скобок:', closeBrackets);
  return rootNode;
}

// ункция renderTree() - отображает дерево на веб-странице.
function visualizeTree(tree, depth = 0) {
  let treeStr = '';

  if (tree) {
    if (!isNaN(tree.value) && tree.value !== null) {
      treeStr += ' '.repeat(depth * 8) + tree.value + '\n';
    }

    tree.children.forEach(child => {
      treeStr += visualizeTree(child, depth + 1);
    });
  }

  return treeStr;
}



