import { createSelector } from "reselect";

const orderBy = (state) => state.orderBy;
const orderDir = (state) => state.orderDir;
const searchText = (state) => state.searchText;
const listMembers = (state) => state.list;

const listTaskSearchAndSort = createSelector(
    orderBy,
    orderDir,
    searchText,
    listMembers,
    (orderBy, orderDir, searchText, listMembers) => {
        if (orderBy === "name") orderBy = "fullname";
        if (orderBy === "active") orderBy = "status";
        return listMembers
            .filter((member) => {
                let memberName = member.fullname.toLocaleLowerCase();
                let searchName = searchText.toLocaleLowerCase();
                return memberName.search(searchName) !== -1;
            })
            .sort(function (a, b) {
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

export default listTaskSearchAndSort;
