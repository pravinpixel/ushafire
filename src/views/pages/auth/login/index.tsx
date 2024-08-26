import { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler } from 'react-hook-form';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { outlinedInputClasses } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import { useRouter } from 'helper/CustomHooks';
import { logoImageText } from 'helper/AssetHelper';
import { loginSchema } from 'helper/ValidationSchema';
import { notify, decrypt, SESSIONANDLOCAL } from 'helper/GlobalHelper';

import { setLocalStorage } from 'configs/StorageConfigs';

import useSocketStore from 'zustand-config/SocketZustand';
import useMyProfieStore from 'zustand-config/MyProfileZustand';

import { useAuthLogin } from 'store/hooks/AuthHooks';

import InputField from 'views/components/form-components/InputField';

type FormValues = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const router = useRouter();
  const socket = useSocketStore((state) => state.socket);
  const { setUser } = useMyProfieStore();
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(loginSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  //Auth Hooks
  const { mutateAsync: authLoginApi, isPending } = useAuthLogin();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const handleFormSumbit: SubmitHandler<FormValues> = async (data) => {
    authLoginApi(data, {
      onSuccess: async (res) => {
        const { user } = res.data;
        const getMe = JSON.parse(decrypt(res.data.user.getme));
        setLocalStorage(SESSIONANDLOCAL.PROJECT_ACCESS_TOKEN, user.accessToken);
        setLocalStorage(SESSIONANDLOCAL.PROJECT_REFRESH_TOKEN, user.refreshToken);
        const { id } = jwtDecode<{ id: string }>(user.accessToken);
        socket?.emit('join_room', id);
        setUser(getMe);
        notify(res);
        router.replace('/');
      },
      onError: (error) => {
        notify(error);
      },
    });
  };

  return (
    <Box
      sx={{
        my: 8,
        mx: 4,
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: 850,
        // alignItems: 'center',
        justifyContent: 'space-around',
      }}
      component="form"
      onSubmit={handleSubmit(handleFormSumbit)}
    >
      <Stack justifyContent={'center'} alignItems={'center'}>
        <Avatar
          src={logoImageText}
          sx={{
            width: 'max-content',
            height: '6.3125rem',
          }}
          variant="square"
        />
        <Typography component="h1" mt={5} variant="h5">
          Sign In with your credentials
        </Typography>
        <Box
          sx={{
            mt: 1,
            minWidth: '65%',
          }}
        >
          <Grid>
            <InputField
              name="email"
              control={control}
              fieldProps={{
                margin: 'normal',
                id: 'email',
                placeholder: 'Enter your email ',
                autoComplete: 'email',
                size: 'medium',
                fullWidth: true,
                sx: {
                  [`& .${outlinedInputClasses.root}`]: {
                    background: 'none',
                  },
                },
              }}
            />
            <InputField
              name="password"
              control={control}
              fieldProps={{
                fullWidth: true,
                placeholder: 'Enter your password',
                autoComplete: 'current-password',
                type: showPassword ? 'text' : 'password',
                size: 'medium',
                sx: {
                  [`& .${outlinedInputClasses.root}`]: {
                    background: 'none',
                  },
                },
                InputProps: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Grid>
        </Box>
        <LoadingButton loading={isPending} type="submit" variant="contained" sx={{ mt: 3, mb: 2, borderRadius: 0, height: '3rem', width: '7rem' }}>
          Sign In
        </LoadingButton>
      </Stack>
    </Box>
  );
};

export default LoginPage;
