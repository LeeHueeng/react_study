import badWords from "./krList.json";

function Filter(props) {
  const noFilterContent = props;
  const badWordPattern = new RegExp(badWords.badWords.join("|"), "gi");
  const placeHolder = "♥";
  const filteredList = noFilterContent.replace(badWordPattern, placeHolder);
  return filteredList;
}

export default Filter;
