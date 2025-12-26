import * as React from "react";
import { Modal } from "./Modal";

type DialogProps = React.ComponentProps<typeof Modal>;

export function Dialog(props: DialogProps) {
  return <Modal {...props} />;
}

