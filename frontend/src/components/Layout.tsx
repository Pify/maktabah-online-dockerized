import TopAppBar from "./TopAppBar";
import BottomAppBar from "./BottomAppBar";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
    return (
        <div>
            <TopAppBar />
            <main style={{ paddingTop: '4px', paddingBottom: '40px' }}>
                <Outlet />
            </main>
            <BottomAppBar />
        </div>
    )
}

export default Layout;