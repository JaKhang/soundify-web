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
import {useAppDispatch} from "@redux/store.ts";
import authApi from "../../api/AuthApi.ts";
import {getPrincipal} from "@features/auth/authSlice.ts";
import {useNavigate} from "react-router";
import {useTranslation} from "react-i18next";
import {ApiError} from "../../api/Error.ts";

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
    const {t} = useTranslation()
    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        setError,
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

    function handleError(e: ApiError) {
        switch (e.code){
            case 1004:
                setError('email', {message: t('validate.badCredentials')})
        }
    }

    const onSubmit = async (data: LoginFormData) => {
        setIsLoading(true);
        setLoginError(null);

        authApi.login(data.email, data.password)
            .then((token) => dispatch(getPrincipal(token.token)))
            .then(() => navigate("/"))
            .catch((e: ApiError) => handleError(e))
            .finally(() => setIsLoading(false))
    };

    const handleSocialLogin = (provider: string) => {
        console.log(`auth with ${provider}`);
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
                        {t('auth.title')}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        {t('auth.continue')}
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
                                required: t('validate.email.required'),
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: t('validate.email.invalid'),
                                },
                            }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    margin="normal"
                                    fullWidth
                                    id="email"
                                    label={t('auth.email')}
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
                                required: t('validate.password.invalid'),
                                minLength: {
                                    value: 8,
                                    message: t('validate.password.min'),
                                },
                            }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    margin="normal"
                                    fullWidth
                                    label={t('auth.password')}
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
                            <Grid item>
                                <Link href="#" variant="body2" underline="hover">
                                    {
                                        t('auth.forgotPassword')
                                    }
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
                                t('login')
                            )}
                        </Button>

                        <Grid container justifyContent="center">
                            <Grid item>
                                <Typography variant="body2" color="text.secondary">
                                    {t('auth.dontHaveAccount')}
                                    <Link href="#" variant="body2" underline="hover">
                                        {t('register.name')}
                                    </Link>
                                </Typography>
                            </Grid>
                        </Grid>

                        <Divider sx={{ my: 3 }}>{t('auth.or')}</Divider>

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
