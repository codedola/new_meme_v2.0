import { createSelector } from "reselect";

const orderBy = (state) => state.orderBy;
const orderDir = (state) => state.orderDir;
const listComments = (state) => state.list;

const listCommentSort = createSelector(
    orderBy,
    orderDir,
    listComments,
    (orderBy, orderDir, listComments) => {
        if (orderBy === "name") orderBy = "fullname";
        if (orderBy === "latest") orderBy = "time_added";
        return listComments.sort(function (a, b) {
            let indexNumber = 1; // desc
            if (orderDir === "asc") indexNumber = -1;

            if (a[orderBy] !== b[orderBy]) {
                return a[orderBy] > b[orderBy] ? indexNumber : -indexNumber;
            } else {
                return 0;
            }
        });
    }
);

export default listCommentSort;
