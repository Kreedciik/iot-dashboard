import type { SignIn } from 'src/types/signin';
import type { SubmitHandler } from 'react-hook-form';

import { useState } from 'react';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { showErrorToast } from 'src/utils/show-toast';

import { useAuth } from 'src/hoc/auth-provider';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------
export function SignInView() {
  const { handleLogin } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const signInMutate = useMutation({
    mutationFn: handleLogin,
    onSuccess: (data) => {
      router.push('/');
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        showErrorToast({ message: err.response?.data });
      }
    },
  });
  const { register, handleSubmit } = useForm<SignIn>();
  const onSubmit: SubmitHandler<SignIn> = (data) => {
    signInMutate.mutate(data);
  };

  const renderForm = (
    <Box display="flex" flexDirection="column" alignItems="flex-end">
      <TextField
        fullWidth
        label="Email address"
        placeholder="Email address"
        InputLabelProps={{ shrink: true }}
        required
        defaultValue="test@mail.com"
        {...register('email')}
        sx={{ mb: 3 }}
      />

      <TextField
        fullWidth
        label="Password"
        placeholder="Password"
        required
        defaultValue="secretPassword"
        {...register('password')}
        InputLabelProps={{ shrink: true }}
        type={showPassword ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                <Iconify icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{ mb: 3 }}
      />

      <LoadingButton
        loading={signInMutate.isLoading}
        fullWidth
        size="large"
        type="submit"
        color="inherit"
        variant="contained"
      >
        Sign in
      </LoadingButton>
    </Box>
  );

  return (
    <>
      <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 5 }}>
        <Typography variant="h5">Sign in</Typography>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>{renderForm}</form>
    </>
  );
}
