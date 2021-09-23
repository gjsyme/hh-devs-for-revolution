const buildDevFromArray = (tokenId, devArray) => ({
  name: `Dev #${tokenId}`,
  os: devArray[0],
  textEditor: devArray[1],
  clothing: devArray[2],
  language: devArray[3],
  industry: devArray[4],
  location: devArray[5],
  mind: devArray[6],
  vibe: devArray[7]
});

module.exports = buildDevFromArray;