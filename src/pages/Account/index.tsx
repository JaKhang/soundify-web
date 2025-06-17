import React from 'react';
import { useAuthSelector } from "@redux/selector.ts";
import { useTranslation } from "react-i18next";
import {
    Box,
    Paper,
    Typography,
    Avatar,
    Divider,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Button
} from '@mui/material';
import {
    Email as EmailIcon,
    CalendarMonth as CalendarMonthIcon,
    Language as LanguageIcon,
    CheckCircle as CheckCircleIcon,
    Edit as EditIcon,
    Logout as LogoutIcon
} from '@mui/icons-material';
import {UserStatus} from "@features/auth/UserStatus.ts";

const AccountDetails = () => {
    const { principal } = useAuthSelector();
    const { t } = useTranslation();

    // Function to format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    // Function to get status color
    const getStatusColor = (status) => {
        switch(status) {
            case UserStatus.ACTIVE:
                return 'success.main';
            case UserStatus.INACTIVE:
                return 'warning.main';
            case UserStatus.DELETED:
                return 'error.main';
            case UserStatus.PENDING:
                return 'info.main';
            case 'banned':
                return 'error.main';
            default:
                return 'text.secondary';
        }
    };

    return (
        <Box sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
                {/* Header Section with Title and Avatar */}
                <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                    {t('account.title')}
                </Typography>
                {!principal ? (
                    <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                        {t('account.noUserData')}
                    </Typography>
                ) : (
                    <>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, flexDirection: { xs: 'column', sm: 'row' }, textAlign: { xs: 'center', sm: 'left' } }}>
                            {principal?.avatar?.length > 0 ? (
                                <Avatar
                                    src={principal.avatar[0].url}
                                    sx={{ width: 100, height: 100, mr: { sm: 3 }, mb: { xs: 2, sm: 0 } }}
                                />
                            ) : (
                                <Avatar sx={{ width: 100, height: 100, mr: { sm: 3 }, mb: { xs: 2, sm: 0 }, bgcolor: 'primary.main' }}>
                                    {principal?.name?.charAt(0) || principal?.username?.charAt(0) || '?'}
                                </Avatar>
                            )}
                            <Box>
                                <Typography variant="h4" gutterBottom>
                                    {principal?.name || principal?.username || t('account.noUserData')}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                                    @{principal?.username || t('account.noUserData')}
                                </Typography>
                                <Typography variant="body2" color={getStatusColor(principal?.status)} sx={{ mt: 1 }}>
                                    {t('account.status')}: {t(`account.statuses.${principal?.status}`) || t('account.noUserData')}
                                </Typography>
                                {principal?.isVerified !== undefined && (
                                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, justifyContent: { xs: 'center', sm: 'flex-start' } }}>
                                        <CheckCircleIcon color={principal.isVerified ? "success" : "disabled"} sx={{ mr: 1, fontSize: 18 }} />
                                        <Typography variant="body2" color={principal.isVerified ? "success.main" : "text.secondary"}>
                                            {t('account.verified')}: {t(principal.isVerified ? 'account.yes' : 'account.no')}
                                        </Typography>
                                    </Box>
                                )}
                            </Box>
                        </Box>

                        <Divider sx={{ mb: 3 }} />

                        {/* Details List */}
                        <List>
                            <ListItem disablePadding sx={{ py: 1.5 }}>
                                <ListItemIcon sx={{ minWidth: 36 }}>
                                    <EmailIcon color="action" />
                                </ListItemIcon>
                                <ListItemText
                                    primary={t('account.email')}
                                    secondary={principal?.email || t('account.noUserData')}
                                />
                            </ListItem>
                            <ListItem disablePadding sx={{ py: 1.5 }}>
                                <ListItemIcon sx={{ minWidth: 36 }}>
                                    <CalendarMonthIcon color="action" />
                                </ListItemIcon>
                                <ListItemText
                                    primary={t('account.dob')}
                                    secondary={principal?.dob ? formatDate(principal.dob) : t('account.noUserData')}
                                />
                            </ListItem>
                            <ListItem disablePadding sx={{ py: 1.5 }}>
                                <ListItemIcon sx={{ minWidth: 36 }}>
                                    <LanguageIcon color="action" />
                                </ListItemIcon>
                                <ListItemText
                                    primary={t('account.locale')}
                                    secondary={principal?.locale || t('account.noUserData')}
                                />
                            </ListItem>
                        </List>

                        {/* Action Buttons */}
                        <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                            <Button
                                variant="outlined"
                                startIcon={<EditIcon />}
                                size="medium"
                            >
                                {t('account.editProfile')}
                            </Button>
                            <Button
                                variant="contained"
                                startIcon={<LogoutIcon />}
                                size="medium"
                                color="error"
                            >
                                {t('account.logout')}
                            </Button>
                        </Box>
                    </>
                )}
            </Paper>
        </Box>
    );
};

export default AccountDetails;


