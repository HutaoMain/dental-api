import { useQuery } from "react-query";

interface Props {
  email: string;
}

const ViewTreatmentRecord = ({ email }: Props) => {
  // const { data } = useQuery<UserInterface>({
  //     queryKey: ["Navbar"],
  //     queryFn: () =>
  //       fetch(`${import.meta.env.VITE_APP_API_URL}/api/user/${user}`).then(
  //         (res) => res.json()
  //       ),
  //   });

  return <div></div>;
};

export default ViewTreatmentRecord;
