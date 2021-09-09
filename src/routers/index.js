import { PATHS } from "../constants";
import HomePage from "../pages/HomePage";
import Login from "../pages/Login";
import PostCategories from "../pages/PostCategories";
import PostDetail from "../pages/PostDetail";
import UserProfile from "../pages/UserProfile";
import SearchResult from "../pages/SearchResult";
import UserDetail from "../pages/UserDetail";
import ChangePassWord from "../pages/ChangePassWord";
import Register from "../pages/Register";
import PostUpload from "../pages/PostUpload";
import PostEdit from "../pages/PostEdit";
import PostDelete from "../pages/PostDelete";
import Dashboard from "../pages/Dashboard";
//
const ROUTERS = [
    
    {
        path: PATHS.LOGIN,
        exact: true,
        Component: Login,
    },
    {
        path: PATHS.POST_LIST_CATEGORY,
        exact: true,
        Component: PostCategories,
    },
    {
        path: PATHS.POST_DETAIL,
        exact: true,
        Component: PostDetail,
    },
    {
        path: PATHS.USER_PROFILE,
        exact: true,
        Component: UserProfile,
    },
    {
        path: PATHS.SEARCH_RESULT,
        exact: true,
        Component: SearchResult,
    },
    {
        path: PATHS.USER_DETAIL,
        exact: true,
        Component: UserDetail,
    },
    {
        path: PATHS.CHANGE_PASSWORD,
        exact: true,
        Component: ChangePassWord,
    },
    {
        path: PATHS.REGISTER,
        exact: true,
        Component: Register,
    },
    {
        path: PATHS.POST_CREATE,
        exact: true,
        Component: PostUpload,
    },
    {
        path: PATHS.POST_EDIT,
        exact: true,
        Component: PostEdit,
    },
    {
        path: PATHS.POST_DELETE,
        exact: true,
        Component: PostDelete,
    },
    {
        path: PATHS.ADMIN_DASHBOARD,
        exact: true,
        Component: Dashboard,
    },
    {
        path: PATHS.HOMEPAGE,
        exact: false,
        Component: HomePage,
    },
];
export default ROUTERS;
