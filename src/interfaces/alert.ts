export interface AlertDto {
    type: string;
    message: string;
    options: {
        key: number;
        variant: 'error' | 'warning' | 'info' | 'success';
        persist?: boolean;
        autoHideDuration?: number;
        anchorOrigin?: {
            vertical?: 'top'|'bottom',
            horizontal?: 'right'|'left'|'center'
          },
    }
}

export interface AlertStateDto {
    notifications: AlertDto[];
}
