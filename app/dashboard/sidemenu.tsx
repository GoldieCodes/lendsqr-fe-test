import Image from "next/image"
import Link from "next/link"

export default function DashboardSideMenu() {
  const customers = [
    { icon: "/user-friends.svg", text: "Users" },
    { icon: "/users.svg", text: "Guarantors" },
    { icon: "/sack.svg", text: "Loans" },
    { icon: "/handshake-regular.svg", text: "Decision Models" },
    { icon: "/piggy-bank.svg", text: "Savings" },
    { icon: "/hand-with-money.svg", text: "Loan Requests" },
    { icon: "/user-check.svg", text: "Whitelist" },
    { icon: "/user-times.svg", text: "Karma" },
  ]
  const businesses = [
    { icon: "/briefcase.svg", text: "Organization" },
    { icon: "/hand-with-money.svg", text: "Loan Products" },
    { icon: "/np_bank.svg", text: "Savings Products" },
    { icon: "/coins-solid.svg", text: "Fees and Charges" },
    { icon: "/icon.svg", text: "Transactions" },
    { icon: "/galaxy.svg", text: "Services" },
    { icon: "/user-cog.svg", text: "Service Account" },
    { icon: "/scroll.svg", text: "Settlements" },
    { icon: "/chart-bar.svg", text: "Reports" },
  ]
  const settings = [
    { icon: "/sliders-h.svg", text: "Preferences" },
    { icon: "/badge-percent.svg", text: "Fees and Pricing" },
    { icon: "/clipboard-list.svg", text: "Audit Logs" },
    { icon: "/tire.svg", text: "Systems Messages" },
  ]

  return (
    <nav className="sidemenu">
      <div className="sideMenuLink">
        <span className="icon">
          <Image src="/briefcase.svg" alt="briefcase" fill />
        </span>
        <p>Switch Organization</p>
        <span className="icon">
          <Image src="/np_next.svg" alt="arrow" fill />
        </span>
      </div>
      <div className="sideMenuLink">
        <span className="icon">
          <Image src="/home.svg" alt="home" fill />
        </span>
        <p>Dashboard</p>
      </div>
      <div className="customers">
        <h3>CUSTOMERS</h3>
        {customers.map((item) =>
          item.text === "Users" ? (
            <Link href="/dashboard">
              <div
                className="sideMenuLink"
                key={item.text}
                data-key={`${item.text.toLowerCase()} icon`}
              >
                <span className="icon">
                  <Image src={item.icon} alt={`${item.text} icon`} fill />
                </span>
                <p>{item.text}</p>
              </div>
            </Link>
          ) : (
            <div
              className="sideMenuLink"
              key={item.text}
              data-key={`${item.text.toLowerCase()} icon`}
            >
              <span className="icon">
                <Image src={item.icon} alt={`${item.text} icon`} fill />
              </span>
              <p>{item.text}</p>
            </div>
          )
        )}
      </div>
      <div className="businesses">
        <h3>BUSINESSES</h3>
        {businesses.map((item) => (
          <div
            className="sideMenuLink"
            key={item.text}
            data-key={`${item.text.toLowerCase()} icon`}
          >
            <span className="icon">
              <Image src={item.icon} alt={`${item.text} icon`} fill />
            </span>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
      <div className="settings">
        <h3>SETTINGS</h3>
        {settings.map((item) => (
          <div
            className="sideMenuLink"
            key={item.text}
            data-key={`${item.text.toLowerCase()} icon`}
          >
            <span className="icon">
              <Image src={item.icon} alt={`${item.text} icon`} fill />
            </span>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
      <div className="logout">
        <div className="sideMenuLink">
          <span className="icon">
            <Image src="/sign-out.svg" alt="sign out" fill />
          </span>
          <p>Logout</p>
        </div>
        <p>v.1.2.0</p>
      </div>
    </nav>
  )
}
