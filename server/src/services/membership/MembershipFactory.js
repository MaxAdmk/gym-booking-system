class MembershipFactory { 
    
    createMembershipData(userId, type) {
        const startDate = new Date();
        let endDate = new Date();

        if (type === 'MONTHLY') {
            endDate.setDate(startDate.getDate() + 30);
        } else if (type === 'SINGLE') {
            endDate.setDate(startDate.getDate() + 1);
        } else {
            throw new Error('Unknown membership type');
        }

        return {
            userId,
            type,
            startDate,
            endDate,
            status: 'ACTIVE'
        };
    }

}

module.exports = new MembershipFactory();