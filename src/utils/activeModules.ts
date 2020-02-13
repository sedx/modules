import q from "qs";
import uniq from "lodash.uniq";

const activeModules =
  q.parse(window.location.search, {
    ignoreQueryPrefix: true
  }).m || [];

export default uniq(["User", ...activeModules]);
