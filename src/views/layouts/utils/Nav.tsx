/**
 * This file is part of AutoPack.
 *
 * It is Nav Item & Nav Tab
 *
 */
/* eslint-disable max-lines */

import React, { useMemo, useState, ReactNode } from 'react';

import { Dashboard, AccountBox, ChevronRight, AccountBalance } from '@mui/icons-material';
import {
  Box,
  List,
  Menu,
  Fade,
  alpha,
  Stack,
  Avatar,
  Tooltip,
  Collapse,
  ListItem,
  MenuItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from '@mui/material';

import { hideScroll } from 'theme/css';
import { CustomDrawer } from 'theme/styled-compounet';
import {
  PersonIcon,
  SingoutIcon,
  ReportsIcon,
  DocumentIcon,
  SingleUserIcon,
  SalesDollarIcon,
  InventoryBoxIcon,
  NotificationIcon,
  AdminsettingIcon,
  LorryShippingIcon,
} from 'theme/svg';

import { logo, logoFull } from 'helper/AssetHelper';
import { notify, permissions } from 'helper/GlobalHelper';
import { useRouter, usePathname, useResponsive } from 'helper/CustomHooks';

import { unsetLocalStorage } from 'configs/StorageConfigs';

import useMyProfieStore from 'zustand-config/MyProfileZustand';

import { useAuthLogOut } from 'store/hooks/AuthHooks';

import Scrollbar from 'views/components/scroll-bar/scrollbar';
import ConfirmationPopup from 'views/components/popups/ConfirmationPopup';

import MobileDrawer from './MobileDrawer';

// ----------------------------------------------------------------------

type NavProps = {
  openNav: boolean;
  handleDrawerClose: () => void;
};

interface NavItemProps {
  icon?: ReactNode;
  title?: string;
  path?: string;
  name?: string;
  children?: NavItemProps[];
  value?: string;
  slug?: string;
}

type StateProps = {
  anchorEl: null | HTMLElement;
  model: boolean;
};

type IconsType = {
  [key: string]: React.ReactNode;
};

const Icons: IconsType = {
  dashboard: <Dashboard />,
  'dashboard-2': <Dashboard />,
  'sales-crm-system': <PersonIcon />,
  'sales-and-purchase': <SalesDollarIcon />,
  'manage-payments': <AccountBalance />,
  'inventory-management': <InventoryBoxIcon />,
  'after-sales': <LorryShippingIcon />,
  'service-contracts': <AccountBox />,
  notifications: <NotificationIcon inheritViewBox={false} />,
  master: <SingleUserIcon />,
  'sign-out': <SingoutIcon />,
  'admin-settings': <AdminsettingIcon />,
  documents: <DocumentIcon />,
  reports: <ReportsIcon />,
  module: <DocumentIcon />,
  'child-module': <PersonIcon />,
  'parent-module': <SingleUserIcon />,
  supplier: <PersonIcon />,
  default: <Dashboard />,
};

export default function Nav({ openNav, handleDrawerClose }: NavProps) {
  const upLg = useResponsive('up', 'lg');
  const router = useRouter();
  const permissionss = useMyProfieStore((state) => state.user?.role_id?.access_manage || []);

  //Dynamic Navbar Based on User Permission
  const navConfig = useMemo(() => {
    const navs: NavItemProps[] = [];
    const desiredOrder = [
      'dashboard',
      'dashboard-2',
      'sales-crm-system',
      'manage-payments',
      'sales-and-purchase',
      'inventory-management',
      'after-sales',
      'service-contracts',
      'notifications',
      'master',
      'reports',
      'supplier',
      'admin-settings',
      'module',
    ];
    const sortedChildren = [
      'contacts',
      'companies',
      'deals',
      'loans',
      'purchase-order',
      'sales-order',
      'blanket-order',
      'sales-invoice',
      'organization',
      'lead-management',
      'opportunity',
      'quotation',
      'sales-return',
      'manage-payments',
      'po-request',
      'product-inventory',
      'stock-inward',
      'stock-outward',
      'barcode',
      'warehouse-wise-stock',
      'stock-level-indicators',
      'department',
      'designation',
      'customer-group',
      'lead-status',
      'opportunity-stage',
      'category',
      'sub-category',
      'brand',
      'location',
      'warehouse',
      'bay',
      'rack',
      'shelf',
      'bin',
      'stacking',
      'uom',
      'country',
      'state',
      'city',
      'currency',
      'business-vertical',
      'sub-vertical',
      'customer-type',
      'division',
      'product-group',
      'stock',
      'product-type',
      'tandc-template',
      'delivery-terms-template',
      'payment-terms-template',
      'type',
      'user',
      'role',
      'parent-module',
      'child-module',
    ];
    const permissionNav = [...permissionss, ...permissions].sort((a, b) => {
      const aIndex = desiredOrder.indexOf(a.fend_component ?? '');
      const bIndex = desiredOrder.indexOf(b?.fend_component ?? '');
      return aIndex - bIndex;
    });
    permissionNav?.forEach((permission) => {
      let parentPath: NavItemProps = {};
      if (permission.access) {
        parentPath = {
          title: permission.name,
          path: permission.path,
          name: permission.fend_component,
          slug: permission.slug,
          icon: Icons[permission.fend_component ?? 'dashboard'] ?? Icons['default'],
          value: permission?.child && permission?.child?.length >= 1 ? 'children' : 'path',
        };
        if (permission?.child && permission?.child?.length >= 1) {
          const childre: NavItemProps[] = [];
          permission?.child?.forEach((child) => {
            let childNav = {};
            if (child.access) {
              childNav = {
                title: child.name,
                path: child.path,
                name: child.fend_component,
                slug: child.slug,
                value: 'path',
              };
              childre.push(childNav as NavItemProps);
            }
          });
          childre.sort((a, b) => {
            const aIndex = sortedChildren.indexOf(a.name ?? '');
            const bIndex = sortedChildren.indexOf(b.name ?? '');
            return aIndex - bIndex;
          });
          parentPath.children = childre;
        }
        navs.push(parentPath);
      }
    });
    return [...navs, { name: 'sign-out', title: 'Sign Out', path: '/auth/login', icon: Icons['sign-out'], value: 'path' }];
  }, [permissionss]);
  const renderMenu = (
    <Box sx={{ ...hideScroll?.y, overflowY: 'hidden' }}>
      <List
        sx={{
          overflow: 'hidden',
          borderRight: ({ palette }) => `1px solid ${palette.divider}`,
        }}
      >
        <ListItem
          disablePadding
          sx={{
            display: 'block',
          }}
        >
          <ListItemButton onClick={() => router.push('/')}>
            <ListItemIcon
              sx={{
                width: '45px',
              }}
            >
              <Avatar src={logo} alt="photoURL" />
            </ListItemIcon>
            <ListItemText>
              {/* {openNav && ( */}
              <Avatar
                src={logoFull}
                sx={{
                  width: 'max-content',
                }}
                variant="square"
              />
              {/* )} */}
            </ListItemText>
          </ListItemButton>
        </ListItem>
        <Scrollbar
          sx={{
            height: 'calc(100vh - 70px)',
            overflowX: 'hidden',
          }}
        >
          {navConfig.map((item, index) => (
            <NavItem item={item} openNav={openNav} key={index} />
          ))}
        </Scrollbar>
      </List>
    </Box>
  );
  return (
    <>
      {upLg ? (
        <CustomDrawer variant="permanent" open={openNav}>
          {renderMenu}
        </CustomDrawer>
      ) : (
        <MobileDrawer openNav={openNav} onCloseNav={handleDrawerClose} renderContent={renderMenu} />
      )}
    </>
  );
}

// ---------------------------------------------------------------------- //

function NavItem({ item, openNav }: { item: NavItemProps; openNav: boolean }) {
  const pathname = usePathname();
  const router = useRouter();
  const upLg = useResponsive('up', 'lg');
  const [confirmModel, setConfirmModel] = useState<{
    model: boolean;
    content: string;
    message?: string;
    value: object;
  }>({
    model: false,
    content: '',
    message: '',
    value: {},
  });
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<StateProps>({ anchorEl: null, model: false });
  const active =
    pathname === '/'
      ? item.name === 'dashboard'
      : String(pathname)
          .split('/')
          .includes(item?.name ?? '');

  //Hooks
  const { mutateAsync } = useAuthLogOut();

  async function handleLogut(data: object) {
    await mutateAsync(data, {
      onSuccess: (res) => {
        notify(res);
        unsetLocalStorage();
        router.replace('/auth/login');
      },
      onError: (err) => {
        notify(err);

        router.replace('/auth/login');
      },
    });
  }

  const handleOpen = (event: React.MouseEvent<HTMLElement>, value?: string, path?: string, name?: string) => {
    switch (value) {
      case 'path':
        name === 'sign-out'
          ? setConfirmModel({
              ...confirmModel,
              content: '',
              model: true,
              value: { value },
            })
          : router.push(path || '/');
        break;
      default:
        setOpen(!open);
        !openNav &&
          setAnchorEl({
            anchorEl: event.currentTarget,
            model: true,
          });
        break;
    }
  };
  const handleClose = () => {
    setOpen(false);
    setAnchorEl({
      anchorEl: null,
      model: false,
    });
  };

  return (
    <>
      <ListItem disablePadding sx={{ display: 'block' }}>
        <ListItemButton
          onClick={(e) => {
            handleOpen(e, item.value, item.path, item.name);
          }}
          sx={{
            px: 2.5,
            minHeight: 44,
            borderRadius: 0.75,
            typography: 'body2',
            textTransform: 'capitalize',
            display: 'flex',
            alignContent: 'center',
            ...(active && {
              color: ({ palette }) => (item?.value === 'path' ? palette.primary.main : ''),
              bgcolor: (theme) => (item?.value === 'path' ? alpha(theme.palette.primary.main, 0.08) : ''),
              '&:hover': {
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
              },
              borderRadius: (theme) => theme.shape.borderRadius / 10,
            }),
          }}
        >
          <Tooltip title={!openNav && item.title} placement="right-start">
            <ListItemIcon
              sx={{
                minWidth: '0',
                pr: 1,
                ...(active && { color: 'primary.main' }),
              }}
            >
              {item.icon}
            </ListItemIcon>
          </Tooltip>
          <ListItemText sx={{ opacity: openNav ? 1 : 0 }}>
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} gap={1}>
              {item.title}
              {item.children && openNav && <ChevronRight />}
            </Stack>
          </ListItemText>
        </ListItemButton>
        {openNav && item.children && (
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List disablePadding>
              {item.children.map((data, index) => (
                <ListItemButton
                  key={index}
                  onClick={(e) => handleOpen(e, data.value, data.path, data.slug)}
                  sx={{
                    py: 0.65,
                    px: 0,
                    mx: 0.65,
                    ...(String(pathname)
                      .split('/')
                      .includes(data?.slug ?? '') && {
                      color: 'primary.main',
                      bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                      '&:hover': {
                        bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
                      },
                      borderRadius: (theme) => theme.shape.borderRadius / 10,
                    }),
                  }}
                >
                  <ListItemIcon></ListItemIcon>
                  <ListItemIcon
                    sx={{
                      minWidth: '0',
                      pr: 1,
                      ...(String(pathname)
                        .split('/')
                        .includes(data?.slug ?? '') && { color: 'primary.main' }),
                    }}
                  >
                    {data.icon}
                  </ListItemIcon>
                  <ListItemText primary={data.title} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        )}
      </ListItem>
      {upLg && !openNav && item.children && (
        <Menu
          id="fade-menu"
          MenuListProps={{
            'aria-labelledby': 'fade-button',
          }}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'center',
            horizontal: 'left',
          }}
          anchorEl={!openNav && anchorEl.anchorEl}
          open={!openNav && anchorEl.model}
          onClick={handleClose}
          TransitionComponent={Fade}
        >
          {item?.children?.map((data, index) => (
            <MenuItem
              key={index}
              onClick={(e) => {
                handleClose();
                handleOpen(e, data.value, data.path, data.slug);
              }}
            >
              {data.title}
            </MenuItem>
          ))}
        </Menu>
      )}
      <ConfirmationPopup
        open={confirmModel.model}
        handleClose={() =>
          setConfirmModel({
            ...confirmModel,
            model: false,
          })
        }
        message={confirmModel.message}
        handleSubmit={() => handleLogut(confirmModel.value)}
        label={'Sign Out'}
        content={confirmModel.content}
      />
    </>
  );
}
