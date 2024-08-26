export interface Permission {
  view?: JSX.Element;
  edit?: JSX.Element;
  add?: JSX.Element;
}

export interface ComponentPermissions {
  component: JSX.Element;
  view?: JSX.Element;
  edit?: JSX.Element;
  add?: JSX.Element;
}

export interface NestedComponentPermissions {
  component: JSX.Element;
  view?: JSX.Element;
  edit?: JSX.Element;
  add?: JSX.Element;
  [key: string]: NestedComponentPermissions | JSX.Element | undefined;
}

export interface PermissionData {
  [key: string]: ComponentPermissions | NestedComponentPermissions;
}

export interface RouteInterfaces {
  path: string;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  element: any;
}
