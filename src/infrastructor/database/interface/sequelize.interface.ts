/** @format */

interface IQuyery {
    where?: { [key: string]: any } | any;
    limit?: number;
    offset?: number;
    include: [obj: { model: any; [key: string]: any }];
    attributes?: [string, [any]] | { exclude?: [string?]; include?: [string?] };
    group?: [string];
    raw?: boolean;
    nest?: boolean;
    order?: [col?: string | [string, string?]];
}

interface IDBMethods {
    create: (obj: { id: string; [key: string]: any }) => any;
    findAll: (obj?: IQuyery | {}) => any;
    findOne: (obj?: IQuyery | {}) => any;
    findOrCreate: (obj: {
        where: { [key: string]: any };
        defaults: { id: string; [key: string]: any };
    }) => any;
    bulkCreate: ([any], obj?: any) => any;
    update: (
        obj: { [key: string]: any },
        obj2?: { where: { [key: string]: any } },
    ) => any;
    findByPk: (id: any) => any;
    findAndCountAll: (obj?: IQuyery | {}) => any;
    destroy: (obj: { where: { [key: string]: any } }) => any;
    destroyAll: () => any;
    count: (obj?: { where: { [key: string]: any } }) => any;
    min: (col: string, obj?: { where: { [key: string]: any } }) => any;
    sum: (col: string, obj?: { where: { [key: string]: any } }) => any;
    max: (col: string, obj?: { where: { [key: string]: any } }) => any;
}

interface UserMethod extends IDBMethods {
    /**
     * Tạo một bản ghi người dùng mới trong hệ thống.
     *
     * @param obj Đối tượng chứa thông tin chi tiết của người dùng.
     * @param obj.id Mã định danh duy nhất của người dùng.
     * @param obj.full_name Tên đầy đủ của người dùng.
     * @param obj.username Tên người dùng duy nhất để đăng nhập hoặc nhận dạng trong hệ thống.
     * @param obj.email Địa chỉ email của người dùng, dùng cho liên hệ hoặc xác thực.
     * @param obj.avatar URL ảnh đại diện của người dùng.
     * @param obj.auth_provider Nhà cung cấp dịch vụ xác thực, ví dụ: 'local', 'facebook', v.v.
     * @param obj.provider_id ID của người dùng từ nhà cung cấp xác thực, cho phép giá trị null nếu không có.
     * @param obj.last_login Thời gian đăng nhập lần cuối của người dùng, tính bằng timestamp.
     * @param obj.is_online Trạng thái trực tuyến của người dùng: `true` nếu đang online, `false` nếu offline.
     * @param obj.last_seen Thời gian hoạt động cuối cùng của người dùng, tính bằng timestamp.
     * @param obj.role Vai trò của người dùng trong hệ thống, ví dụ: 'admin', 'user', v.v.
     * @returns Trả về một đối tượng bất kỳ có thể chứa dữ liệu liên quan đến người dùng vừa tạo.
     */
    create: (obj: {
        id: string;
        full_name: string;
        username?: string;
        email?: string;
        avatar: string;
        auth_provider?: string; // local, facebook,...
        provider_id?: string; // allow null
        last_loin?: number;
        is_online?: boolean;
        last_seen?: number; // time action
        role?: string;
    }) => any;
    findOrCreate: (obj: {
        where: { [key: string]: any };
        defaults: {
            id?: string;
            full_name?: string;
            username?: string;
            email?: string;
            avatar?: string;
            auth_provider?: string; // local, facebook,...
            provider_id?: string; // allow null
            last_loin?: number;
            is_online?: boolean;
            last_seen?: number; // time action
            role?: string;
        };
    }) => any;
}

interface BlockedUserMethod extends IDBMethods {
    create: (obj: { id: string; user_id: string; friend_id: string }) => any;
    findOrCreate: (obj: {
        where: { [key: string]: any };
        defaults: {
            id?: string;
            user_id?: string;
            friend_id?: string;
        };
    }) => any;
}

interface MessageMethod extends IDBMethods {
    create: (obj: {
        id: string;
        conversation_id: string;
        sender_id?: string;
        message_type: string;
        content?: string;
        status?: string; // sent, recieved, seen
        is_pined?: boolean;
    }) => any;
    findOrCreate: (obj: {
        where: { [key: string]: any };
        defaults: {
            id?: string;
            conversation_id?: string;
            sender_id?: string;
            message_type?: string;
            content?: string;
            status?: string; // sent, recieved, seen
            is_pined?: boolean;
        };
    }) => any;
}

interface ContactCardMessageMethod extends IDBMethods {
    create: (obj: { id: string; message_id: string; user_id: string }) => any;
    findOrCreate: (obj: {
        where: { [key: string]: any };
        defaults: {
            id?: string;
            message_id?: string;
            user_id?: string;
        };
    }) => any;
}

interface FriendshipMethod extends IDBMethods {
    create: (obj: {
        id: string;
        requester_id: string;
        accepter_id: string;
    }) => any;
    findOrCreate: (obj: {
        where: { [key: string]: any };
        defaults: {
            id?: string;
            requester_id?: string;
            accepter_id?: string;
        };
    }) => any;
}

interface ParticipantMethod extends IDBMethods {
    create: (obj: {
        id: string;
        conversation_id?: string;
        user_id?: string;
        joined_at?: number;
        role?: string;
        can_send_message: boolean;
        is_pinned: boolean;
        pinned_at: number;
        is_hidden: boolean;
    }) => any;
    findOrCreate: (obj: {
        where: { [key: string]: any };
        defaults: {
            id?: string;
            conversation_id?: string;
            user_id?: string;
            joined_at?: number;
            role?: string;
            can_send_message?: boolean;
            is_pinned?: boolean;
            pinned_at?: number;
            is_hidden?: boolean;
        };
    }) => any;
}

interface ShareMessageMethod extends IDBMethods {
    create: (obj: {
        id: string;
        message_id: string;
        message_share_id: string;
    }) => any;
    findOrCreate: (obj: {
        where: { [key: string]: any };
        defaults: {
            id?: string;
            message_id?: string;
            message_share_id?: string;
        };
    }) => any;
}

interface MediaMessageMethod extends IDBMethods {
    create: (obj: {
        id: string;
        message_id?: string;
        media_type?: string; // image, video, audio
        media_url?: string;
    }) => any;
    findOrCreate: (obj: {
        where: { [key: string]: any };
        defaults: {
            id?: string;
            message_id?: string;
            media_type?: string; // image, video, audio
            media_url?: string;
        };
    }) => any;
}

interface NotifyMessageMethod extends IDBMethods {
    create: (obj: {
        id: string;
        message_id?: string;
        notify_type?: string; // new_partcipant, leave, timeline, ...
        content: string;
        user_id: string;
        timeline: number;
    }) => any;
    findOrCreate: (obj: {
        where: { [key: string]: any };
        defaults: {
            id?: string;
            message_id?: string;
            notify_type?: string; // new_partcipant, leave, timeline, ...
            content?: string;
            user_id?: string;
            timeline?: number;
        };
    }) => any;
}

interface FriendRequestMethod extends IDBMethods {
    create: (obj: {
        id: string;
        from_user_id?: string;
        to_user_id?: string;
        request_message?: string;
        status: string; // pending, accepted, canceled
        response_time: number;
    }) => any;
    findOrCreate: (obj: {
        where: { [key: string]: any };
        defaults: {
            id?: string;
            from_user_id?: string;
            to_user_id?: string;
            request_message?: string;
            status?: string; // pending, accepted, canceled
            response_time?: number;
        };
    }) => any;
}

interface UserNicknameMethod extends IDBMethods {
    create: (obj: {
        id: string;
        user_id: string;
        friend_id: string;
        nickname?: string;
    }) => any;
    findOrCreate: (obj: {
        where: { [key: string]: any };
        defaults: {
            id?: string;
            user_id?: string;
            friend_id?: string;
            nickname?: string;
        };
    }) => any;
}

interface ConversationMethod extends IDBMethods {
    create: (obj: {
        id: string;
        group_name: string;
        is_group?: boolean;
        last_message_at: number;
        background_image: string;
        status: string;
    }) => any;
    findOrCreate: (obj: {
        where: { [key: string]: any };
        defaults: {
            id?: string;
            group_name?: string;
            is_group?: boolean;
            last_message_at?: number;
            background_image?: string;
            status?: string; // active, deleted, suspeneded
        };
    }) => any;
}

interface MessageReactionMethod extends IDBMethods {
    create: (obj: {
        id: string;
        message_id?: string;
        user_id?: string;
        icon_type?: string;
        icon_count: number;
    }) => any;
    findOrCreate: (obj: {
        where: { [key: string]: any };
        defaults: {
            id?: string;
            message_id?: string;
            user_id?: string;
            icon_type?: string;
            icon_count?: number;
        };
    }) => any;
}

interface UserSettingMethod extends IDBMethods {
    create: (obj: {
        id: string;
        user_id: string;
        setting_name: string;
        setting_value: string;
    }) => any;
    findOrCreate: (obj: {
        where: { [key: string]: any };
        defaults: {
            id?: string;
            user_id?: string;
            setting_name?: string;
            setting_value?: string;
        };
    }) => any;
}

export default interface IDB {
    BlockedUsers?: BlockedUserMethod;
    Users?: UserMethod;
    Messages?: MessageMethod;
    ContactCardMessage?: ContactCardMessageMethod;
    Friendships?: FriendshipMethod;
    Participants?: ParticipantMethod;
    ShareMessage?: ShareMessageMethod;
    MediaMessage?: MediaMessageMethod;
    NotifyMessage?: NotifyMessageMethod;
    FriendRequests?: FriendRequestMethod;
    UserNicknames?: UserNicknameMethod;
    Conversations?: ConversationMethod;
    MessageReactions?: MessageReactionMethod;
    UserSettings?: UserSettingMethod;
    sequelize?: any;
    Sequelize?: any;
}
