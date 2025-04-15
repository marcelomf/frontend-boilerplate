import { Button } from "../ui/button";

export function ButtonBack() {

  const handleClick = () => {
    history.go(-1);
  };

  return (
    <Button variant={"secondary"} onClick={handleClick} style={{cursor:'pointer'}}>
      Back
    </Button>
  )

}

