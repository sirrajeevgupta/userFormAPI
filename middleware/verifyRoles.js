const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.roles)
      return res.status(401).json({
        message: ' user does not have any roles',
      });
    const rolesArray = [...allowedRoles];
    console.log(`Roles required to execute API: ${rolesArray}`);
    console.log(`User Roles: ${req.roles}`);
    const result = req.roles
      .map((role) => rolesArray.includes(role))
      .find((val) => val === true);

    if (!result)
      return res.status(401).json({
        'Access Denied':
          'User does not have required roles to perform this action',
      });
    next();
  };
};

module.exports = verifyRoles;
