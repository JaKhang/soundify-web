import React, {useEffect, useState} from 'react';
import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Chip,
    CircularProgress,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Tooltip
} from "@mui/material";
import {Device} from "@models/Account.ts";
import accountApi from "../../api/AccountApi.ts";
import {useTranslation} from "react-i18next";
import dayjs from 'dayjs';
import LogoutIcon from '@mui/icons-material/Logout';

const DeviceDetails = () => {
    const [devices, setDevices] = useState<Device[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
    const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const {t} = useTranslation();

    const fetchDevices = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await accountApi.getDevices();
            setDevices(response);
        } catch (error) {
            console.error('Error fetching devices:', error);
            setError(t('devices.errorFetching', 'Error loading devices'));
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchDevices();
    }, [t]);

    const handleLogoutClick = (device: Device) => {
        setSelectedDevice(device);
        setLogoutDialogOpen(true);
    };

    const handleLogoutCancel = () => {
        setLogoutDialogOpen(false);
        setSelectedDevice(null);
    };

    const handleLogoutConfirm = async () => {
        if (!selectedDevice) return;

        try {
            setIsLoggingOut(true);
            await accountApi.logoutDevice(selectedDevice.id);
            await fetchDevices(); // Refresh the device list
            setLogoutDialogOpen(false);
        } catch (error) {
            console.error('Error logging out device:', error);
            setError(t('devices.errorLogout', 'Error logging out device'));
        } finally {
            setIsLoggingOut(false);
            setSelectedDevice(null);
        }
    };

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ p: 3 }}>
                <Typography color="error" align="center">
                    {error}
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
                {t('devices.title', 'Device Login History')}
            </Typography>

            <TableContainer
                component={Paper}
                sx={{
                    mb: 2,
                    '& .MuiTableCell-root': {
                        px: 2,
                        py: 1.5
                    }
                }}
            >
                <Table size="medium">
                    <TableHead>
                        <TableRow>
                            <TableCell>{t('devices.platform', 'Platform')}</TableCell>
                            <TableCell>{t('devices.os', 'OS')}</TableCell>
                            <TableCell>{t('devices.ip', 'IP Address')}</TableCell>
                            <TableCell>{t('devices.status', 'Status')}</TableCell>
                            <TableCell>{t('devices.loginAt', 'Login Time')}</TableCell>
                            <TableCell align="right">{t('devices.actions', 'Actions')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {devices.map((device) => (
                            <TableRow
                                key={device.id}
                                sx={{
                                    '&:last-child td, &:last-child th': { border: 0 },
                                    backgroundColor: device.isCurrent ? 'action.hover' : 'inherit'
                                }}
                            >
                                <TableCell>{device.platform}</TableCell>
                                <TableCell>{device.os}</TableCell>
                                <TableCell>{device.ip}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={device.isCurrent ? t('devices.current', 'Current') : t('devices.inactive', 'Inactive')}
                                        color={device.isCurrent ? "success" : "default"}
                                        size="small"
                                        sx={{
                                            minWidth: 75,
                                            '& .MuiChip-label': {
                                                px: 1
                                            }
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    {dayjs(device.loginAt).format('YYYY-MM-DD HH:mm:ss')}
                                </TableCell>
                                <TableCell align="right">
                                    {!device.isCurrent && (
                                        <Tooltip title={t('devices.logout', 'Logout Device')}>
                                            <IconButton
                                                size="small"
                                                onClick={() => handleLogoutClick(device)}
                                                color="error"
                                            >
                                                <LogoutIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {devices.length === 0 && (
                <Box sx={{
                    textAlign: 'center',
                    py: 4,
                    backgroundColor: 'background.paper',
                    borderRadius: 1
                }}>
                    <Typography color="text.secondary">
                        {t('devices.noDevices', 'No devices found')}
                    </Typography>
                </Box>
            )}

            {/* Logout Confirmation Dialog */}
            <Dialog
                open={logoutDialogOpen}
                onClose={handleLogoutCancel}
                maxWidth="xs"
                fullWidth
            >
                <DialogTitle>
                    {t('devices.logoutConfirmTitle', 'Confirm Logout')}
                </DialogTitle>
                <DialogContent>
                    <Typography>
                        {t('devices.logoutConfirmMessage', 'Are you sure you want to log out this device?')}
                    </Typography>
                    {selectedDevice && (
                        <Box sx={{ mt: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1 }}>
                            <Typography variant="body2">
                                <strong>{t('devices.platform', 'Platform')}:</strong> {selectedDevice.platform}
                            </Typography>
                            <Typography variant="body2">
                                <strong>{t('devices.ip', 'IP')}:</strong> {selectedDevice.ip}
                            </Typography>
                            <Typography variant="body2">
                                <strong>{t('devices.loginAt', 'Login Time')}:</strong> {dayjs(selectedDevice.loginAt).format('YYYY-MM-DD HH:mm:ss')}
                            </Typography>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleLogoutCancel}
                        disabled={isLoggingOut}
                    >
                        {t('common.cancel', 'Cancel')}
                    </Button>
                    <Button
                        onClick={handleLogoutConfirm}
                        color="error"
                        variant="contained"
                        disabled={isLoggingOut}
                    >
                        {isLoggingOut ? t('devices.loggingOut', 'Logging out...') : t('devices.logout', 'Logout')}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default DeviceDetails;
