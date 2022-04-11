<TextField
  select
  fullWidth
  value={selFilter}
  onChange={setselFilter}
  variant="outlined"
  color="white"
  focused
  sx={{
    "& .MuiOutlinedInput-root": {
      height: "40px",
    },
    "& .MuiSelect-outlined": {
      color: "white.main",
      textAlign: "center",
    },
    "& .MuiSelect-iconOutlined ": {
      color: "white.main",
    },
  }}
>
  {ftype.map((option, ix) => (
    <MenuItem key={option} value={option} selected={true}>
      {option}
    </MenuItem>
  ))}
</TextField>;
