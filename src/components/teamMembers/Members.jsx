import Member from "./Member";

export default function Members() {
  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold">Team Members</h3>
      <div className="mt-3 space-y-4">
        <Member />
      </div>
    </div>
  )
}