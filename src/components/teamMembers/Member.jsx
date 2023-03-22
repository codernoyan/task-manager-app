export default function Member({ team }) {
  const { name, avatar } = team || {};
  return (
    <div className="checkbox-container">
      <img src={avatar} className="team-avater" />
      <p className="label">{name}</p>
    </div>
  )
}