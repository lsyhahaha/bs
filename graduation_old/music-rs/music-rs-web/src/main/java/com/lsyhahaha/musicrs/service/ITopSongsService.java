package com.lsyhahaha.musicrs.service;

import com.lsyhahaha.musicrs.util.result.Result;

public interface ITopSongsService {
    /**
     * 根据当前歌曲id查找相似相似
     * @param iid 当前歌曲id
     * @return 相似歌曲集合
     */
    Result querySimilarSongs(String iid);
}
