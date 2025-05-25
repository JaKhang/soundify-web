// EnhancedLoginForm.tsx
import React, { useState } from 'react';
import {
    Container,
    Paper,
    TextField,
    Button,
    Typography,
    Box,
    Alert,
    IconButton,
    InputAdornment,
    CircularProgress,
    Link,
    Checkbox,
    FormControlLabel,
    Grid,
    Divider,
} from '@mui/material';
import {
    Visibility,
    VisibilityOff,
    Email,
    Lock,
    Google,
    GitHub,
} from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import {useAppDispatch} from "@redux/index.ts";
import authApi from "../../api/AuthApi.ts";
import {getPrincipal} from "@features/auth/authSlice.ts";
import {useNavigate} from "react-router";

interface LoginFormData {
    email: string;
    password: string;
    rememberMe: boolean;
}

const EnhancedLoginForm: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [loginError, setLoginError] = useState<string | null>(null);
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm<LoginFormData>({
        mode: 'onChange',
        defaultValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
    });

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit = async (data: LoginFormData) => {
        setIsLoading(true);
        setLoginError(null);

        authApi.login(data.email, data.password)
            .then((token) => dispatch(getPrincipal(token.token)).unwrap())
            .then(() => navigate("/"))
    };

    const handleSocialLogin = (provider: string) => {
        console.log(`Login with ${provider}`);
    };

    return (
        <Container component="main" maxWidth="sm">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    minHeight: '100vh',
                }}
            >
                <Box
                    boxShadow={"rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;"}
                    sx={{
                        padding: { xs: 3, sm: 4 },
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100%',
                        borderRadius: 2,
                        backgroundColor: 'background.paper',
                    }}
                >
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{
                            mb: 1,
                            fontWeight: 600,
                            color: 'primary.main',
                        }}
                    >
                        Welcome Back
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        Please sign in to continue
                    </Typography>

                    {loginError && (
                        <Alert
                            severity="error"
                            sx={{ width: '100%', mb: 2 }}
                            onClose={() => setLoginError(null)}
                        >
                            {loginError}
                        </Alert>
                    )}

                    <Box
                        component="form"
                        onSubmit={handleSubmit(onSubmit)}
                        sx={{ width: '100%' }}
                        noValidate
                    >
                        <Controller
                            name="email"
                            control={control}
                            rules={{
                                required: 'Email is required',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Invalid email address',
                                },
                            }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    margin="normal"
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    autoComplete="email"
                                    autoFocus
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                    slotProps={{
                                        input: {
                                            startAdornment: <InputAdornment position="start">
                                                <Email color="action" />
                                            </InputAdornment>,
                                        },
                                    }}
                                />
                            )}
                        />

                        <Controller
                            name="password"
                            control={control}
                            rules={{
                                required: 'Password is required',
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters',
                                },
                            }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    margin="normal"
                                    fullWidth
                                    label="Password"
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    autoComplete="current-password"
                                    error={!!errors.password}
                                    helperText={errors.password?.message}

                                    slotProps={{
                                        input: {
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Lock color="action" />
                                                </InputAdornment>
                                            ),
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleTogglePasswordVisibility}
                                                        edge="end"
                                                        size="small"
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        },
                                    }}
                                />
                            )}
                        />

                        <Grid container alignItems="center" sx={{ mt: 1, mb: 2 }}>
                            <Grid item xs>
                                <Controller
                                    name="rememberMe"
                                    control={control}
                                    render={({ field }) => (
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    {...field}
                                                    checked={field.value}
                                                    color="primary"
                                                    size="small"
                                                />
                                            }
                                            label="Remember me"
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2" underline="hover">
                                    Forgot password?
                                </Link>
                            </Grid>
                        </Grid>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 2,
                                mb: 2,
                                py: 1.5,
                                fontSize: '1rem',
                                fontWeight: 500,
                                textTransform: 'none',
                            }}
                            disabled={isLoading || !isValid}
                        >
                            {isLoading ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : (
                                'Sign In'
                            )}
                        </Button>

                        <Grid container justifyContent="center">
                            <Grid item>
                                <Typography variant="body2" color="text.secondary">
                                    Don't have an account?{' '}
                                    <Link href="#" variant="body2" underline="hover">
                                        Sign Up
                                    </Link>
                                </Typography>
                            </Grid>
                        </Grid>

                        <Divider sx={{ my: 3 }}>OR</Divider>

                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    startIcon={<Google />}
                                    onClick={() => handleSocialLogin('Google')}
                                    sx={{
                                        py: 1,
                                        textTransform: 'none',
                                        borderColor: 'divider',
                                        color: 'text.primary',
                                        '&:hover': {
                                            borderColor: 'primary.main',
                                            backgroundColor: 'action.hover',
                                        },
                                    }}
                                >
                                    Google
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    startIcon={<GitHub />}
                                    onClick={() => handleSocialLogin('GitHub')}
                                    sx={{
                                        py: 1,
                                        textTransform: 'none',
                                        borderColor: 'divider',
                                        color: 'text.primary',
                                        '&:hover': {
                                            borderColor: 'primary.main',
                                            backgroundColor: 'action.hover',
                                        },
                                    }}
                                >
                                    GitHub
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default EnhancedLoginForm;
