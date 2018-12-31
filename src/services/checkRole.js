export const getUserRole = email => {

  const roles = {
    admin: ["ctw@ctwhome.com"],
    premium: [
      "other@other.nl"
    ]
  };

  if (roles.premium.includes(email)){
    return "premium";
  }
  if (roles.admin.includes(email)){
    return "admin";
  }
  return null;

};
