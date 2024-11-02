import Image from "next/image"

export default function Dashboard() {
  const dashbOverview = [
    { icon: "/np_2users.svg", text: "Users", number: "2,453" },
    { icon: "/np_3users.svg", text: "Active users", number: "2,453" },
    { icon: "/np_loan.svg", text: "Users with loans", number: "12,453" },
    { icon: "/np_money.svg", text: "Users with savings", number: "102,453" },
  ]

  return (
    <div className="dashbContentWrapper">
      <main className="dashboardContentBody">
        <h1>Users</h1>
        <div className="overview">
          {dashbOverview.map((item, index) => (
            <div
              className="itemBox"
              key={index}
              data-key={`${item.text.toLowerCase()}`}
            >
              <span className="icon">
                <Image
                  src={item.icon}
                  alt={`${item.text} icon`}
                  width={40}
                  height={40}
                />
              </span>
              <p>{item.text}</p>
              <p className="number">{item.number}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
