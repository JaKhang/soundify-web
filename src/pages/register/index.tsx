// RegisterForm.tsx
import React, { useState } from 'react';
import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    Grid,
    Alert,
    IconButton,
    InputAdornment,
    CircularProgress,
    MenuItem,
} from '@mui/material';
import {
    Visibility,
    VisibilityOff,
    Email,
    Lock,
    Person,
    CalendarMonth,
    Wc,
} from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { useAppDispatch } from "@redux/store.ts";
import authApi from "../../api/AuthApi.ts";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { ApiError } from "../../api/Error.ts";

interface RegisterFormData {
    email: string;
    displayName: string;
    dateOfBirth: string;
    gender: string;
    password: string;
    confirmPassword: string;
}

const RegisterForm: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [registerError, setRegisterError] = useState<string | null>(null);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        setError,
        watch,
    } = useForm<RegisterFormData>({
        mode: 'onChange',
        defaultValues: {
            email: '',
            displayName: '',
            dateOfBirth: '',
            gender: '',
            password: '',
            confirmPassword: '',
        },
    });

    const passwordValue = watch('password');

    const handleTogglePasswordVisibility = () => setShowPassword((prev) => !prev);

    function handleError(e: ApiError) {
        switch (e.code) {
            case 1010:
                setError('email', { message: t('validate.email.exists') });
                break;
            case 400:
                for (const f in e.data) {
                    // @ts-ignore
                    setError(f, {
                        // @ts-ignore
                        message: t(e.data[f])
                    })
                }
                break;
            default:
                setRegisterError(e.message || t('register.error'));
        }
    }

    const onSubmit = async (data: RegisterFormData) => {
        setIsLoading(true);
        setRegisterError(null);

        if (data.password !== data.confirmPassword) {
            setError('confirmPassword', { message: t('validate.confirmPassword.notMatch') });
            setIsLoading(false);
            return;
        }

        authApi.register({
            email: data.email,
            displayName: data.displayName,
            dateOfBirth: data.dateOfBirth,
            gender: data.gender,
            password: data.password,
        })
            .then(() => navigate("/login"))
            .catch((e: ApiError) => handleError(e))
            .finally(() => setIsLoading(false));
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
                    <Typography component="h1" variant="h4" sx={{ mb: 1, fontWeight: 600, color: 'primary.main' }}>
                        {t('register.title')}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        {t('register.continue')}
                    </Typography>

                    {registerError && (
                        <Alert severity="error" sx={{ width: '100%', mb: 2 }} onClose={() => setRegisterError(null)}>
                            {registerError}
                        </Alert>
                    )}

                    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%' }} noValidate>
                        {/* Email */}
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
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Email color="action" />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            )}
                        />

                        {/* Display Name */}
                        <Controller
                            name="displayName"
                            control={control}
                            rules={{ required: t('validate.displayName.required') }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    margin="normal"
                                    fullWidth
                                    id="displayName"
                                    label={t('register.displayName')}
                                    autoComplete="name"
                                    error={!!errors.displayName}
                                    helperText={errors.displayName?.message}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Person color="action" />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            )}
                        />

                        {/* Date of Birth */}
                        <Controller
                            name="dateOfBirth"
                            control={control}
                            rules={{
                                required: t('validate.dateOfBirth.required'),
                                pattern: {
                                    value: /^\d{4}-\d{2}-\d{2}$/,
                                    message: t('validate.dateOfBirth.invalid'),
                                },
                            }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    margin="normal"
                                    fullWidth
                                    id="dateOfBirth"
                                    label={t('register.dateOfBirth')}
                                    type="date"
                                    InputLabelProps={{ shrink: true }}
                                    error={!!errors.dateOfBirth}
                                    helperText={errors.dateOfBirth?.message}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <CalendarMonth color="action" />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            )}
                        />

                        {/* Gender */}
                        <Controller
                            name="gender"
                            control={control}
                            rules={{ required: t('validate.gender.required') }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    select
                                    margin="normal"
                                    fullWidth
                                    id="gender"
                                    label={t('register.gender')}
                                    error={!!errors.gender}
                                    helperText={errors.gender?.message}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Wc color="action" />
                                            </InputAdornment>
                                        ),
                                    }}
                                >
                                    <MenuItem value="MALE">{t('register.genderMale')}</MenuItem>
                                    <MenuItem value="FEMALE">{t('register.genderFemale')}</MenuItem>
                                    <MenuItem value="OTHER">{t('register.genderOther')}</MenuItem>
                                </TextField>
                            )}
                        />

                        {/* Password */}
                        <Controller
                            name="password"
                            control={control}
                            rules={{
                                required: t('validate.password.required'),
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
                                    autoComplete="new-password"
                                    error={!!errors.password}
                                    helperText={errors.password?.message}
                                    InputProps={{
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
                                    }}
                                />
                            )}
                        />

                        {/* Confirm Password */}
                        <Controller
                            name="confirmPassword"
                            control={control}
                            rules={{
                                required: t('validate.confirmPassword.required'),
                                validate: value =>
                                    value === passwordValue || t('validate.confirmPassword.notMatch'),
                            }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    margin="normal"
                                    fullWidth
                                    label={t('register.confirmPassword')}
                                    type={showPassword ? 'text' : 'password'}
                                    id="confirmPassword"
                                    autoComplete="new-password"
                                    error={!!errors.confirmPassword}
                                    helperText={errors.confirmPassword?.message}
                                    InputProps={{
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
                                    }}
                                />
                            )}
                        />

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
                            {isLoading ? <CircularProgress size={24} color="inherit" /> : t('register.name')}
                        </Button>

                        <Grid container justifyContent="center">
                            <Grid item>
                                <Typography variant="body2" color="text.secondary">
                                    {t('register.alreadyHaveAccount')}
                                    <Button variant="text" onClick={() => navigate('/login')} sx={{ ml: 1 }}>
                                        {t('login')}
                                    </Button>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default RegisterForm;
