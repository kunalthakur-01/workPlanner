package com.assignment.fsad.enums;

public enum UserRoles {
    MANAGER("MANAGER"),
    TEAM_LEAD("TEAM_LEAD"),
    DEVELOPER("DEVELOPER"),
    ;

    private final String value;

    UserRoles(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public static UserRoles fromValue(String value) {
        for (UserRoles role : UserRoles.values()) {
            if (role.value.equalsIgnoreCase(value)) {
                return role;
            }
        }
        throw new IllegalArgumentException("Unknown task type: " + value);
    }
}
