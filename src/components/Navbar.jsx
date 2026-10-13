import logoImg from "../assets/images/writing,png"


function Navbar({activeTab, setActiveTab}) {

    const menus = [
        {id: 'board', label:'BOARD'},
        {id:'filter', label:'FILTER'},
        {id:'note', label:'ADD NOTE'},
        {id:'about', label:'ABOUT'},
    ]

    return (
        <nav className="navbar">

            
            <div className="navbar-logo">
            <img src={logoImg} alt="Task Board Logo" className="navbar-logo-image" />
            <h2>Task Board</h2>

            </div>

            <div className="navbar-menu">
                {menus.map((menu) => (
                    <button 
                    key={menu.id}
                    onClick={() => setActiveTab(menu.id)}
                    className={`nav-btn ${activeTab === menu.id ? 'active' : ''}`}
                    >
                        {menu.label}
                    </button>
                ))}
            </div>

        </nav>
    )
}

export default Navbar