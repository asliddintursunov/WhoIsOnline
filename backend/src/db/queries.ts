export const createUser = `
    INSERT INTO users (username, password, is_online, created_at)
    VALUES (?, ?, 0, CURRENT_TIMESTAMP)
`
export const getByUsername = `
  SELECT id, username, password, created_at, is_online
  FROM users
  WHERE username = ?
`;

export const changeOnlineStatus = `
    UPDATE users SET is_online = ? WHERE id = ?
`

export const getById = `
    SELECT * FROM users WHERE id = ?
`;

export const getAllUsers = `
    SELECT * FROM users
`;