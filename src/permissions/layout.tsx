import { ReactNode } from "react";
import { useAbility } from "../hooks/useAbility";

type Props = {
  action: string;
  subject: string;
  fallback?: ReactNode;
  children: ReactNode;
};

export function Protected({
  action,
  subject,
  fallback = null,
  children,
}: Props) {
  const ability = useAbility();
  if (!ability.can(action as any, subject as any)) {
    return <>{fallback}</>;
  }
  return <>{children}</>;
}

// example usage in a page:
{
  /* <Protected action="update" subject="Post" fallback={<p>Not allowed.</p>}>

 </Protected>; */
}
