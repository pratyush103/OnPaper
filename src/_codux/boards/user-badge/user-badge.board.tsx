import React from 'react';
import { createBoard } from '@wixc3/react-board';
import { UserBadge } from '../../../components/user-badge/user-badge';

export default createBoard({
    name: 'UserBadge',
    Board: () => <UserBadge />,
    isSnippet: true,
});
