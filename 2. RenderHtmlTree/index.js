let output = "";

function renderHtmlTree(node) {
  let { tagName, text, attributeMap = {} } = node;

  output += `< ${tagName} ${Object.entries(attributeMap)
    .map(([key, value]) => `${key}=${value}`)
    .join(" ")} >${text}`;
  if (node.children.length > 0) node.children.forEach(renderHtmlTree);
  output += `</${tagName}>`;

  return output;
}

const htmlTree = {
  tagName: "div",
  text: "hello",
  attributeMap: { id: "one" },
  children: [{ tagName: "div", text: "body", children: [] }, { tagName: "span", text: "title", children: [] }],
};

console.log(JSON.stringify(renderHtmlTree(htmlTree)));
