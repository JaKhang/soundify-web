import {Album, AlbumType} from "@models/Album.ts";
import {Artist} from "@models/Artist.ts";
import {Track} from "@models/Track.ts";


export const artist: Artist = {
    id: "01JTQ270DJ7WMQW561JY3Y4VA5",
    name: "Hoàng Dũng",
    images: [
        {
            url: "https://i.scdn.co/image/ab6761610000e5ebd1f2d75c4da62e87d1ede357",
            height: 640,
            width: 640
        },
        {
            url: "https://i.scdn.co/image/ab67616100005174d1f2d75c4da62e87d1ede357",
            height: 320,
            width: 320
        },
        {
            url: "https://i.scdn.co/image/ab6761610000f178d1f2d75c4da62e87d1ede357",
            height: 160,
            width: 160
        }
    ],
    genres: ['pop', 'ballad'],
    popularity: 50,
    followers: 540241,
    localeTag: "vi_vn"
}


const date = new Date('2022-08-24')



export const album: Album = {
    artists: [
        artist
    ],
    explicit: false,
    genres: ['pop', 'ballad'],
    id: "01JTQ25ZDV3D8ARMAQGKPEYQD4",
    images:  [
        {
            url: "https://i.scdn.co/image/ab67616d0000b273d0e2168c8f5e545b621ad549",
            height: 640,
            width: 640,
        },
        {
            url: "https://i.scdn.co/image/ab67616d00001e02d0e2168c8f5e545b621ad549",
            height: 300,
            width: 300,
        },
        {
            url: "https://i.scdn.co/image/ab67616d00004851d0e2168c8f5e545b621ad549",
            height: 64,
            width: 64,
        },
    ],
    label: "yiyang",
    localeTag: "vi_vn",
    name: "Yên EP",
    notAvailableLocaleTags: [],
    popularity: 0,
    releaseDate: "24/08/2022",
    type: AlbumType.ALBUM,
    numberOfTracks: 4

}

export const tracks: Track[] = [
    {
        id: "01JTQ2DTKPQQE5EZA7XDBK4PTY",
        name: "Yên Intro",
        duration: 84,
        explicit: false,
        playable: true,
        popularity: 0,
        album: album,
        artists: [artist],
        genres: ['pop', 'ballad'],
        index: 1
    },
    {
        id: "01JTQ2R4H6Z5QV6368G7Y8E1RX",
        name: "Ném Câu Yêu Vào Không Trung",
        duration: 236,
        explicit: false,
        playable: false,
        popularity: 0,
        album: album,
        artists: [artist],
        genres: ['pop', 'ballad'],
        index: 2
    },
    {
        id: "01JTQ2SFXHF57H5038GMDPDHKK",
        name: "Đôi Mươi",
        duration: 236,
        explicit: false,
        playable: false,
        popularity: 0,
        album: album,
        artists: [artist],
        genres: ['pop', 'ballad'],
        index: 3
    },
    {
        id: "01JTQ2VJ710A8KVKNFFSJAC4QW",
        name: "Đoạn Kết Mới",
        duration: 0,
        explicit: false,
        playable: false,
        popularity: 0,
        album: album,
        artists: [artist],
        genres: ['pop', 'ballad'],
        index: 3
    }
]

export const albums : Album[] = [album,
    {
        "artists": [
            {
                "id": "1EowJ1WwkMzkCkRomFhui7",
                "name": "RADWIMPS",
                "images": [],  // Note: Spotify API does not provide artist images directly in album data
                "genres": [],
                "popularity": 10,  // This would need to be fetched separately
                "followers": 0,  // This would also need to be fetched separately
                "localeTag": "vi_vn"
            }
        ],
        "explicit": false,
        "genres": [],
        "id": "4hAlZU3JXoThQ3jnF4CGiZ",
        "images": [
            {
                "url": "https://i.scdn.co/image/ab67616d0000b273512668c8cf31d12749a6fa40",
                "height": 640,
                "width": 640
            },
            {
                "url": "https://i.scdn.co/image/ab67616d00001e02512668c8cf31d12749a6fa40",
                "height": 300,
                "width": 300
            },
            {
                "url": "https://i.scdn.co/image/ab67616d00004851512668c8cf31d12749a6fa40",
                "height": 64,
                "width": 64
            }
        ],
        "label": "voque ting co., ltd.",
        "localeTag": "vi_vn",
        "name": "Weathering With You -Complete Version-",
        "notAvailableLocaleTags": [],
        "popularity": 52,
        "releaseDate": "2019-11-27",
        "type": AlbumType.ALBUM,
        "numberOfTracks": 6
    },
    {
        "artists": [
            {
                "id": "64tJ2EAv1R6UaZqc4iOCyj",
                "name": "YOASOBI",
                "images": [],  // Note: Spotify API does not provide artist images directly in album data
                "genres": [],
                "popularity": 0,  // This would need to be fetched separately
                "followers": 0,  // This would also need to be fetched separately
                "localeTag": "vi_vn"
            }
        ],
        "explicit": false,
        "genres": [],
        "id": "4h9tiuZQB6hXz68dzZED6g",
        "images": [
            {
                "url": "https://i.scdn.co/image/ab67616d0000b273cbf34641aa37bdab0fd93816",
                "height": 640,
                "width": 640
            },
            {
                "url": "https://i.scdn.co/image/ab67616d00001e02cbf34641aa37bdab0fd93816",
                "height": 300,
                "width": 300
            },
            {
                "url": "https://i.scdn.co/image/ab67616d00004851cbf34641aa37bdab0fd93816",
                "height": 64,
                "width": 64
            }
        ],
        "label": "YOASOBI",
        "localeTag": "vi_vn",
        "name": "Adventure",
        "notAvailableLocaleTags": [],
        "popularity": 40,
        "releaseDate": "2024-02-16",
        "type": AlbumType.SINGLE,
        "numberOfTracks": 1
    }
    ,
    {
        "artists": [
            {
                "id": "64tJ2EAv1R6UaZqc4iOCyj",
                "name": "YOASOBI",
                "images": [],  // Note: Spotify API does not provide artist images directly in album data
                "genres": [],
                "popularity": 0,  // This would need to be fetched separately
                "followers": 0,  // This would also need to be fetched separately
                "localeTag": "vi_vn"
            }
        ],
        "explicit": false,
        "genres": [],
        "id": "1xhO0GSoezdPJcSuNe1ySv",
        "images": [
            {
                "url": "https://i.scdn.co/image/ab67616d0000b273684d81c9356531f2a456b1c1",
                "height": 640,
                "width": 640
            },
            {
                "url": "https://i.scdn.co/image/ab67616d00001e02684d81c9356531f2a456b1c1",
                "height": 300,
                "width": 300
            },
            {
                "url": "https://i.scdn.co/image/ab67616d00004851684d81c9356531f2a456b1c1",
                "height": 64,
                "width": 64
            }
        ],
        "label": "YOASOBI",
        "localeTag": "vi_vn",
        "name": "THE BOOK",
        "notAvailableLocaleTags": [],
        "popularity": 72,
        "releaseDate": "2021-01-06",
        "type": AlbumType.ALBUM,
        "numberOfTracks": 9
    },
    {
        "artists": [
            {
                "id": "57g2v7gJZepcwsuwssIfZs",
                "name": "Vũ.",
                "images": [],  // Note: Spotify API does not provide artist images directly in album data
                "genres": [],
                "popularity": 0,  // This would need to be fetched separately
                "followers": 0,  // This would also need to be fetched separately
                "localeTag": "vi_vn"
            }
        ],
        "explicit": false,
        "genres": [],
        "id": "3pprs1r3mH3UhU23TUHBWJ",
        "images": [
            {
                "url": "https://i.scdn.co/image/ab67616d0000b273be066d7fd668d8a0672b1245",
                "height": 640,
                "width": 640
            },
            {
                "url": "https://i.scdn.co/image/ab67616d00001e02be066d7fd668d8a0672b1245",
                "height": 300,
                "width": 300
            },
            {
                "url": "https://i.scdn.co/image/ab67616d00004851be066d7fd668d8a0672b1245",
                "height": 64,
                "width": 64
            }
        ],
        "label": "WM Vietnam",
        "localeTag": "vi_vn",
        "name": "Bảo Tàng Của Nuối Tiếc",
        "notAvailableLocaleTags": [],
        "popularity": 63,
        "releaseDate": "2024-09-27",
        "type": AlbumType.ALBUM,
        "numberOfTracks": 10
    },
    {
        "artists": [
            {
                "id": "57g2v7gJZepcwsuwssIfZs",
                "name": "Vũ.",
                "images": [],  // Note: Spotify API does not provide artist images directly in album data
                "genres": [],
                "popularity": 0,  // This would need to be fetched separately
                "followers": 0,  // This would also need to be fetched separately
                "localeTag": "vi_vn"
            }
        ],
        "explicit": false,
        "genres": [],
        "id": "3pprs1r3mH3UhU23TUHBWJ",
        "images": [
            {
                "url": "https://i.scdn.co/image/ab67616d0000b273be066d7fd668d8a0672b1245",
                "height": 640,
                "width": 640
            },
            {
                "url": "https://i.scdn.co/image/ab67616d00001e02be066d7fd668d8a0672b1245",
                "height": 300,
                "width": 300
            },
            {
                "url": "https://i.scdn.co/image/ab67616d00004851be066d7fd668d8a0672b1245",
                "height": 64,
                "width": 64
            }
        ],
        "label": "WM Vietnam",
        "localeTag": "vi_vn",
        "name": "Bảo Tàng Của Nuối Tiếc",
        "notAvailableLocaleTags": [],
        "popularity": 63,
        "releaseDate": "2024-09-27",
        "type": AlbumType.ALBUM,
        "numberOfTracks": 10
    }



]

