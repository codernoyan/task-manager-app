import { useGetTeamQuery } from "../../features/team/teamApi";
import Error from "../ui/Error";
import Loading from "../ui/Loading";
import Member from "./Member";

export default function Members() {
  const { data: members, isLoading, isError, error } = useGetTeamQuery();

  let content = null;

  if (isLoading) {
    content = <Loading />
  } else if (!isLoading && isError) {
    content = <Error message={error?.error} />
  } else if (!isLoading && !isError && members?.length === 0) {
    content = <Error message="There is no members found!" />
  } else if (!isLoading && !isError && members?.length > 0) {
    content = members?.map((team) => <Member key={team.id} team={team} />)
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold">Team Members</h3>
      <div className="mt-3 space-y-4">
        {content}
      </div>
    </div>
  )
}